"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import {IoCloudUploadOutline} from "react-icons/io5"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { ActivityProps } from "@/types/activity"
import { useRouter } from "next/navigation"

interface Category {
    id: string
    name: string
    imageUrl: string
}

interface EditFormProps{
    activityData: ActivityProps,
    activityId: string
}


const EditActivityForm = ({activityData,activityId}:EditFormProps) => {

    const router = useRouter()

    const tokenAdmin = Cookies.get("token")

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY

    const [file,setFile] = useState<File|null>(null)
    const [previewImg,setPreviewImg] = useState<string|null>(null)
    const [categories,setCategories] = useState<Category[]>([])
    const [categoriesSelected,setCategoriesSelected] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState<number|null>(null)
    const [priceDiscount,setPriceDiscount] = useState<number|null>(null)
    const [rating,setRating] = useState<number|null>(null)
    const [totalReviews,setTotalReviews] = useState<number|null>(null)
    const [facilities,setFacilities] = useState("")
    const [address,setAddress] = useState("")
    const [province,setProvince] = useState("")
    const [city,setCity] = useState("")
    const [locationMaps,setLocationMaps] = useState("")
    const [title,setTitle] = useState("")

    const getCategories = async () => {
        const resCategories = await axios.get(`${BASE_URL}/api/v1/categories`,{
            headers:{
                "apiKey" : API_KEY
            }
        })
        console.log(resCategories)
        setCategories(resCategories.data.data)

    }

    const handleTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleCategories = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setCategoriesSelected(e.target.value)
    }

    const handleDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handlePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setPrice(value)
    }

    const handlePriceDiscount = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setPriceDiscount(value)
    }

    const handleRating = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setRating(value)
    }

    const handleTotalReviews = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setTotalReviews(value)
    }

    const handleFacilities = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFacilities(e.target.value)
    }

    const handleAddress = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddress(e.target.value)
    }

    const handleProvince = (e:React.ChangeEvent<HTMLInputElement>) => {
        setProvince(e.target.value)
    }

    const handleCity = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }

    const handleLocation = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocationMaps(e.target.value)
    }

    
    useEffect(() => {
        getCategories()
    },[])

    useEffect(() => {
        if (activityData) {
            setTitle(activityData.title)
            setCategoriesSelected(activityData.categoryId)
            setDescription(activityData.description)
            setPrice(activityData.price)
            setPriceDiscount(activityData.price_discount)
            setRating(activityData.rating)
            setTotalReviews(activityData.total_reviews)
            setFacilities(activityData.facilities)
            setAddress(activityData.address)
            setProvince(activityData.province)
            setCity(activityData.city)
            setLocationMaps(activityData.location_maps)
                    
            if (activityData.imageUrls && activityData.imageUrls.length > 0) {
            setPreviewImg(activityData.imageUrls[0])
            }

        }
    },[activityData])

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
                title: title,
                description: description,
                imageUrls: [activityPicture],
                price: price,
                price_discount: priceDiscount,
                rating: rating,
                total_reviews: totalReviews,
                facilities: facilities,
                address: address,
                province: province,
                city: city,
                location_maps: locationMaps
            }

            const editRes = await axios.post(`${BASE_URL}/api/v1/update-activity/${activityId}`,payload,{
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
            },4000)
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
                    <input autoComplete="on" onChange={handleTitle} value={title} type="text" name="title" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Activity Title..."/>
                    {/* <div aria-live="polite" aria-atomic="true">
                        <span className="text-sm text-red-500 mt-2">message</span>
                    </div> */}
                </div>
                {/* Categories */}
                <div className="mb-4">
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">Select Categories</label>
                    <select name="categories" id="categories" value={categoriesSelected} onChange={handleCategories} className="border border-gray-500 p-1">
                        {categories.map(category => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {/* Description */}
                <div >
                    <label htmlFor="description" className="font-semibold">Description</label>
                    <textarea autoComplete="on" value={description} name="description" onChange={handleDescription} id="description" rows={2} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Description"></textarea>
                </div>
                {/* price */}
                <div className="mb-4">
                    <label htmlFor="price" className="font-semibold">Price</label>
                    <input autoComplete="on" value={price !== null ? String(price) : ""} onChange={handlePrice} type="text" id="price" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Price..."/>
                </div>
                {/* price discount */}
                <div className="mb-4">
                    <label htmlFor="priceDiscount" className="font-semibold">Price Discount</label>
                    <input autoComplete="on" value={price !== null? String(priceDiscount):""} onChange={handlePriceDiscount} type="text" id="priceDiscount"  className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Discount Price..."/>
                </div>
                {/* Rating */}
                <div className="mb-4">
                    <label htmlFor="rating" className="font-semibold">Rating</label>
                    <input autoComplete="on" value={rating!==null?String(rating):""} onChange={handleRating} type="text" id="rating"  className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Discount Price..."/>
                </div>
                {/* Total Riview */}
                <div className="mb-4">
                    <label htmlFor="totalRiview" className="font-semibold">Total Riview</label>
                    <input autoComplete="on" value={totalReviews!==null? String(totalReviews):""} onChange={handleTotalReviews} type="text" id="totalRiview"  className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Total Riview..."/>
                </div>
                {/* Facilities */}
                <div className="mb-4">
                    <label htmlFor="Facilities" className="font-semibold">Facilities</label>
                    <input autoComplete="on" value={facilities} onChange={handleFacilities} type="text" id="Facilities"  className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Facilities..."/>
                </div>
                {/* Google Maps Location */}
                <div className="mb-4">
                        <label htmlFor="location" className="font-semibold">Google Maps Iframe Embed</label>
                        <textarea onChange={handleLocation} value={locationMaps} name="location" id="location" placeholder="Locaion..." className="py-2 px-4 rounded-sm border border-gray-400 w-full" rows={4}></textarea>
                </div>
                {/* preview maps */}
                <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="border border-gray-300 w-fit" dangerouslySetInnerHTML={{ __html: locationMaps }}/>
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
                
                <div className="mb-4">
                    <label htmlFor="addres" className="font-semibold">Address</label>
                    <textarea value={address}  onChange={handleAddress} id="address" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="address..."></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="province" className="font-semibold">Province</label>
                    <input value={province} onChange={handleProvince} type="text" id="province" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Province..."/>
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="font-semibold">City</label>
                    <input value={city} onChange={handleCity} type="text" id="city" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Province..."/>
                </div>
                

                <button type="submit" className="bg-[#ff385c] text-white w-full hover:bg-[#a31d1d] py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">Update</button>
            </div>
        </div>
    </form>
  )
}

export default EditActivityForm