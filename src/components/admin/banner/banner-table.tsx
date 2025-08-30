"use client"

import { useEffect, useState } from "react"
import { EditBannerButton,DeleteBannerButton } from "./button-banner"
import { fetchBanner } from "@/services/bannerService"
import { BannerProps } from "@/types/banner"
import { formatDate } from "@/lib/utils"

const BannerTable = () => {

    const [banners,setBanners] = useState<BannerProps[]>([])
    const handleDeleteSuccess = (deletedId: string) => {
        setBanners(prev => prev.filter(banner => banner.id !== deletedId))
    }

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchBanner()
                setBanners(data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
    },[])

  return (
    <div className='bg-white p-4 mt-5 shadow-sm overflow-x-scroll'>
            <table className='w-full divide-y'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Image</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Banner Name</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Created At</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Updated At</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {banners.map((banner)=> (
                    <tr key={banner.id} className='hover:bg-gray-100'>
                        <td className='px-6 py-4'><img src={banner.imageUrl || "/images/placeholder.png"}
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null; 
                              target.src = "/images/placeholder.png";
                            }}
                             alt='banner image' className='object-cover min-w-30 min-h-30 md:w-45 md:h-45 rounded-lg'/>
                        </td>
                        <td className='px-6 py-4'>{banner.name}</td>
                        <td className="px-6 py-4">{formatDate(banner.createdAt)}</td>
                        <td className="px-6 py-4">{formatDate(banner.updatedAt)}</td>
                        <td className='px-6 py-4 text-right'>
                            <div className='flex items-center justify-center gap-1'>
                            <EditBannerButton id={banner.id}/>
                            <DeleteBannerButton id={banner.id} onSuccess={() => handleDeleteSuccess(banner.id)}/> 
                            </div>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
  )
}

export default BannerTable