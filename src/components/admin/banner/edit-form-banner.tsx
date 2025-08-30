"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import {IoCloudUploadOutline} from "react-icons/io5"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { BannerProps } from "@/types/banner"

interface EditFormProps{
    bannerData: BannerProps,
    bannerId: string
}


const EditBannerForm = ({bannerData,bannerId}:EditFormProps) => {

    const router = useRouter()

    const tokenAdmin = Cookies.get("token")

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY

    const [file,setFile] = useState<File|null>(null)
    const [previewImg,setPreviewImg] = useState<string|null>(null)
    const [categoriesSelected,setCategoriesSelected] = useState("")
    const [name,setName] = useState("")

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }


    useEffect(() => {
        if (bannerData) {
            setName(bannerData.name)
                    
            if (bannerData.imageUrl && bannerData.imageUrl.length > 0) {
            setPreviewImg(bannerData.imageUrl)
            }

        }
    },[bannerData])

    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if(selectedFile){
            setFile(selectedFile)
            setPreviewImg(URL.createObjectURL(selectedFile))
        }
    }

    const handleDeleteImage = () => {
        setPreviewImg(null)
        setFile(null)
    }

    const handleUpdateBanner = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!file && !previewImg){
            toast.error("No File Detected")
            return;
        }

        try {
            let activityPicture = previewImg

            if (file) {
                const imageForm = new FormData()
                imageForm.append("image", file)
            
                const imageRes = await axios.post(`${BASE_URL}/api/v1/upload-image`, imageForm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "apiKey": API_KEY,
                    },
                })
            
                activityPicture = imageRes.data.url
            }


            const payload = {
                categoryId: categoriesSelected,
                name: name,
                imageUrl: activityPicture,
            }

            const editRes = await axios.post(`${BASE_URL}/api/v1/update-banner/${bannerId}`,payload,{
                headers:{
                    Authorization: `Bearer ${tokenAdmin}`,
                    "Content-Type":"application/json",
                    "apiKey" : API_KEY,
                    
                }
            })
            console.log(editRes)
            toast.success(editRes.data.message)
        } catch (err:any) {
            console.log(err)
            toast.error(err.response?.data?.message || "error")
        }
    }

  return (
    <form onSubmit={handleUpdateBanner}>

        <div className="grid md:grid-cols-12 gap-5">
            <div className="col-span-8 bg-white p-4 h-fit">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <input autoComplete="on" onChange={handleName} value={name} type="text" name="title" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Activity Title..."/>
                </div>
            </div>

            <div className="col-span-4 bg-white p-4">
            {previewImg && 
                <div className="flex justify-end mb-1">
                    <button onClick={handleDeleteImage} className="bg-[#ff385c] pb-1 px-2 rounded-md text-white font-medium cursor-pointer">x</button>
                </div>
            }
                <label htmlFor="input-file" className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative">
                    {previewImg?<div className="flex gap-2 relative">
                  <img src={previewImg} alt="Preview" className="mt-2 object-cover rounded border" />
                </div> :<div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                        <div className="flex flex-col items-center justify-center">
                            <IoCloudUploadOutline aria-hidden="true" className="size-8 pointer-events-none"/>
                            <p className="mb-1 text-sm font-bold">Select Image</p>
                            <p className="text-xs">SVG, PNG, JPG, GIF, or Others (max: 4MB)</p>
                        </div>
                    </div>}
                    {file && <span className="text-sm text-gray-600">{file.name}</span>}
                    <input type="file" name="file" id="input-file" className="hidden" accept="image/*"  onChange={handleUpload}  />
                </label>
                
               
                

                <button type="submit" className="bg-[#ff385c] text-white w-full hover:bg-[#a31d1d] py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">Update</button>

            </div>
        </div>
    </form>
  )
}

export default EditBannerForm