"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import {IoCloudUploadOutline} from "react-icons/io5"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { BASE_URL,API_KEY } from "@/components/main"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Category {
    id: string
    name: string
    imageUrl: string
}


const CreatePromoForm = () => {

    const tokenAdmin = Cookies.get("token")

    const [file,setFile] = useState<File|null>(null)
    const [previewImg,setPreviewImg] = useState<string|null>(null)
    const [description,setDescription] = useState("")
    const [title,setTitle] = useState("")
    const [termsCondition,setTermsCondition] = useState("")
    const [promoCode,setPromoCode] = useState("")
    const [discountPrice,setDiscountPrice] = useState("")
    const [minimumPrice,setMinimumPrice] = useState("")
    const [isDragging,setIsDragging] = useState(false)

    const handleDragOver = (e:React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }
    const handleDragLeave = (e:React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }
    const handleDrop = (e:React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFile = e.dataTransfer.files[0]
        if(droppedFile) {
            if(droppedFile.size> 1 *1024*1024){
                toast.error("file size exceeds 1MB")
                return
            }
            setFile(droppedFile)
            setPreviewImg(URL.createObjectURL(droppedFile))
        }
    }


    const handleTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handlePriceDiscount = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDiscountPrice(e.target.value)
    }

    const handleMinimumPrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMinimumPrice(e.target.value)
    }
    const handleTermsCondition = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTermsCondition(e.target.value)
    }
    const handlePromoCode = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPromoCode(e.target.value)
    }



    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if(selectedFile){
            const maxSize = 1 * 1024 * 1024

            if(selectedFile.size > maxSize){
                toast.error("File Size exceeds 1MB")
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

    const handleCreatePromo = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!file){
            toast.error("No File Detected")
            return;
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

            const promoPicture = imageRes.data.url

            const payload = {
                title: title,
                description: description,
                imageUrl: promoPicture,
                terms_condition: `<p>${termsCondition}</p>`,
                promo_code: promoCode,
                promo_discount_price: Number(discountPrice),
                minimum_claim_price: Number(minimumPrice)
            }

            const createRes = await axios.post(`${BASE_URL}/api/v1/create-promo`,payload,{
                headers:{
                    Authorization: `Bearer ${tokenAdmin}`,
                    "apiKey" : API_KEY,
                    
                }
            })
            console.log(createRes)
            toast.success(createRes.data.message)
        } catch (err:any) {
            console.log(err)
            toast.error(err.response?.data?.message || "error")
        }
    }

  return (
    <form onSubmit={handleCreatePromo}>

        <div className="grid md:grid-cols-12 gap-5">
            <div className="col-span-8 bg-white p-4">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <Input autoComplete="on" onChange={handleTitle} type="text" id="title" name="title" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Promo Title..."/>
                </div>
                {/* Description */}
                <div >
                    <label htmlFor="description" className="font-semibold">Description</label>
                    <Textarea autoComplete="on" name="description" onChange={handleDescription} id="description" rows={2} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Description"></Textarea>
                </div>
                {/* terms condition */}
                <div className="mb-4">
                    <label htmlFor="terms-condition" className="font-semibold">Terms Condition</label>
                    <Textarea autoComplete="on" onChange={handleTermsCondition} name="terms-condition"  className="py-2  px-4 rounded-sm border border-gray-400 w-full" placeholder="Terms condition..."/>
                </div>
                {/* promo code */}
                <div className="mb-4">
                    <label htmlFor="promo-code" className="font-semibold">Promo Code</label>
                    <Input autoComplete="on" onChange={handlePromoCode} type="text" name="promo-code" id="promo-code" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Promo Code..."/>
                </div>
            </div>

            {/* Image & Preview Image   */}
            <div className="col-span-4 bg-white p-4">
            {previewImg && 
                <div className="flex justify-end mb-1">
                    <button onClick={handleDeleteImage} className="bg-[#ff385c] pb-1 px-2 rounded-md text-white font-medium cursor-pointer">x</button>
                </div>
            }
                <label htmlFor="input-file" className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    {previewImg?<div className="flex gap-2 relative">
                  <img src={previewImg} alt="Preview" className="mt-2 object-cover rounded border" />
                </div> :<div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                        <div className="flex flex-col items-center justify-center">
                            <IoCloudUploadOutline aria-hidden="true" className="size-8"/>
                            <p className="mb-1 text-sm font-bold">Select Image</p>
                            <p className="text-xs">SVG, PNG, JPG, GIF, or Others (max: 10MB)</p>
                        <p>Drag & Drop or Click to Upload</p>
                        </div>
                    </div>}
                    {file && <span className="text-sm text-gray-600">{file.name}</span>}
                    <input type="file" name="file" id="input-file" className="hidden" accept="image/*" onChange={handleUpload}  />
                </label>
                {/* discount price */}
                <div className="mb-4">
                        <label htmlFor="discount-price" className="font-semibold">Discount Price</label>
                        <Input onChange={handlePriceDiscount} autoComplete="on" name="discount-price" placeholder="discount Price..." id="discount-price" type="text"/>
                </div>
                {/* minimum price */}
                <div className="mb-4">
                        <label htmlFor="minimum-price" className="font-semibold">Minimum Price</label>
                        <Input onChange={handleMinimumPrice} autoComplete="on" name="minimum-price" placeholder="Minimum Price..." id="minimum-price" type="text"/>
                </div>

                <button type="submit" className="bg-[#ff385c] text-white w-full hover:bg-[#a31d1d] py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">Save</button>

            </div>
        </div>
    </form>
  )
}

export default CreatePromoForm