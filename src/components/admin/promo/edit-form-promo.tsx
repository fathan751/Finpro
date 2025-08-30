"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import {IoCloudUploadOutline} from "react-icons/io5"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { PromoProps } from "@/types/promo"

interface EditFormProps{
    promoData: PromoProps,
    promoId: string
}


const EditPromoForm = ({promoData,promoId}:EditFormProps) => {

    const router = useRouter()

    const tokenAdmin = Cookies.get("token")

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY

    const [file,setFile] = useState<File|null>(null)
    const [previewImg,setPreviewImg] = useState<string|null>(null)
    const [description,setDescription] = useState("")
    const [title,setTitle] = useState("")
    const [termsCondition,setTermsCondition] = useState("")
    const [promoCode,setPromoCode] = useState("")
    const [discountPrice,setDiscountPrice] = useState("")
    const [minimumPrice,setMinimumPrice] = useState("")

    const handleTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    const handleTermsCondition = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTermsCondition(e.target.value)
    }
    const handlePromoCode = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }
    const handleDiscountPrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDiscountPrice(e.target.value)
    }
    const handleMinimumPrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMinimumPrice(e.target.value)
    }


    useEffect(() => {
        if (promoData) {
            setTitle(promoData.title)
            setDescription(promoData.description)
            setTermsCondition(promoData.terms_condition)
            setPromoCode(promoData.promo_code)
                    
            if (promoData.imageUrl && promoData.imageUrl.length > 0) {
            setPreviewImg(promoData.imageUrl)
            }

        }
    },[promoData])

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

    const handleUpdateActivity = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!file && !previewImg){
            toast.error("No File Detected")
            return;
        }

        try {
            let promoPicture = previewImg

            if (file) {
                const imageForm = new FormData()
                imageForm.append("image", file)
            
                const imageRes = await axios.post(`${BASE_URL}/api/v1/upload-image`, imageForm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "apiKey": API_KEY,
                    },
                })
            
                promoPicture = imageRes.data.url
            }


            const payload = {
                title: title,
                description: description,
                imageUrls: promoPicture,
                terms_condition: termsCondition,
                promo_code: promoCode,
                promo_discount_price: discountPrice,
                minimum_claim_price: minimumPrice,
            }

            const editRes = await axios.post(`${BASE_URL}/api/v1/update-promo/${promoId}`,payload,{
                headers:{
                    Authorization: `Bearer ${tokenAdmin}`,
                    "Content-Type":"application/json",
                    "apiKey" : API_KEY,
                    
                }
            })
            console.log(editRes)
            toast.success(editRes.data.message)
            setTimeout(() => {
                router.replace("../")
            },3000)
        } catch (err:any) {
            console.log(err)
            toast.error(err.response?.data?.message || "error")
        }
    }

  return (
    <form onSubmit={handleUpdateActivity}>

        <div className="grid md:grid-cols-12 gap-5">
            <div className="col-span-8 bg-white p-4">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <input autoComplete="on" onChange={handleTitle} value={title} id="title" type="text" name="title" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Activity Title..."/>
                </div>
                {/* Description */}
                <div >
                    <label htmlFor="description" className="font-semibold">Description</label>
                    <textarea autoComplete="on" value={description} name="description" onChange={handleDescription} id="description" rows={2} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Description"></textarea>
                </div>
                <div >
                    <label htmlFor="terms-condition" className="font-semibold">Terms Condition</label>
                    <textarea autoComplete="on" value={termsCondition} name="Terms Condition"  onChange={handleTermsCondition} id="terms-condition" rows={2} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Terms Condition..."></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="promo-code" className="font-semibold">Promo Code</label>
                    <input autoComplete="on" 
                    id="promo-code" onChange={handlePromoCode} value={promoCode} type="text" name="promo-code" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Activity Title..."/>
                </div>
            </div>
                

            {/* Image & Image Preview */}
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

                
                {/* price */}
                <div className="mb-4">
                    <label htmlFor="discount-price" className="font-semibold">Promo Discount Price</label>
                    <input autoComplete="on" value={discountPrice !== null ? String(discountPrice) : ""} onChange={handleDiscountPrice} type="text" id="discount-price" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Discount Price..."/>
                </div>
                {/* price discount */}
                <div className="mb-4">
                    <label htmlFor="minimum-price" className="font-semibold">Minimum Price Claim Discount</label>
                    <input autoComplete="on" value={minimumPrice !== null? String(minimumPrice):""} onChange={handleMinimumPrice} type="text" id="minimum-price"  className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Minimum Price..."/>
                </div>
                
                

                <button type="submit" className="bg-[#ff385c] text-white w-full hover:bg-[#a31d1d] py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">Update</button>
                
            </div>
        </div>
    </form>
  )
}

export default EditPromoForm