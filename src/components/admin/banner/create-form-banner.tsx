"use client"

import axios from "axios"
import React, {useState } from "react"
import {IoCloudUploadOutline} from "react-icons/io5"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { BASE_URL,API_KEY } from "@/components/main"

const CreateBannerForm = () => {

    const tokenAdmin = Cookies.get("token")

    const [file,setFile] = useState<File|null>(null)
    const [name,setName] = useState("")
    const [previewImg,setPreviewImg] = useState<string|null>(null)
    const [errorName,setErrorName] = useState(false)


    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setErrorName(false)
    }

    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if(selectedFile){

            const maxSize = 2 * 1024 * 1024
            if(selectedFile.size>maxSize){
                toast.error("File Size exceeds 10MB")
                return
            }

            setFile(selectedFile)
            setPreviewImg(URL.createObjectURL(selectedFile))
        }
    }

    const handleDeleteImage = () => {
        setPreviewImg(null)
        setFile(null)
    }

    const handleCreateBanner = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!file){
            toast.error("No File Detected")
            return;
        }
        if (!name.trim()) {
        toast.error("Banner name is required")
        setErrorName(true)
        return
}


        try {
            const imageForm = new FormData()
            imageForm.append("image",file)

            const imageRes = await axios.post(`${BASE_URL}/api/v1/upload-image`,imageForm,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "apiKey": API_KEY
                }
            })

            const bannerPicture = imageRes.data.url

            const payload = {
                name: name,
                imageUrl: bannerPicture,
            }

            const createRes = await axios.post(`${BASE_URL}/api/v1/create-banner`,payload,{
                headers:{
                    Authorization: `Bearer ${tokenAdmin}`,
                    "Content-Type":"application/json",
                    "apiKey": API_KEY,
                }
            })
            console.log(createRes)
            toast.success(createRes.data.message)
            setTimeout(() => {
                window.location.replace("./")
            },3000)
        } catch (err:any) {
            console.log(err)
            toast.error(err.response?.data?.message || "error")
        }
    }

  return (
    <form onSubmit={handleCreateBanner}>


        <div className="grid md:grid-cols-12 gap-5">
            <div className="col-span-8 bg-white p-4 max-h-fit">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="name" className="font-semibold">Name</label>
                    <input autoComplete="on" onChange={handleName} type="text" name="name" className={`py-2 px-4 rounded-sm border ${errorName?'border-red-500':'border-gray-400'} w-full`} placeholder="Category Name..."/>
                    {errorName && <p className="text-red-500 text-sm mt-1">Name is required*</p>}
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
                            <IoCloudUploadOutline aria-hidden="true" className="size-8"/>
                            <p className="mb-1 text-sm font-bold">Select Image</p>
                            <p className="text-xs">SVG, PNG, JPG, GIF, or Others (max: 10MB)</p>
                        </div>
                    </div>}
                    {file && <span className="text-sm text-gray-600">{file.name}</span>}
                    <input type="file" name="file" id="input-file" className="hidden" accept="image/*" onChange={handleUpload}  />
                </label>
                
                
                

                <button type="submit" className="bg-[#ff385c] text-white w-full hover:bg-[#a31d1d] py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">Save</button>

            </div>
        </div>
    </form>
  )
}

export default CreateBannerForm