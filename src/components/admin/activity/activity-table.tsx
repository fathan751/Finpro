"use client"

import React, { useEffect, useState } from 'react'
import { BASE_URL, API_KEY } from '@/components/main'
import axios from 'axios'
import { ActivityProps } from '@/types/activity'
import { formatDate,formatCurrency } from '@/lib/utils'
import { DeleteButton,EditButton } from './button'

const ActivityTable = () => {

    const apiKey = API_KEY
    const baseUrl = BASE_URL

    const [activityData,setActivityData] = useState<ActivityProps[]>([])

    const fetchData = async () => {
        try {
            const resTable = await axios.get(`${baseUrl}/api/v1/activities`,{
                headers:{
                    "apiKey": apiKey
                }
            })
            console.log(resTable)
            setActivityData(resTable.data.data)
        } catch (error:any) {
            console.log(error.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    const getImageUrl = (urls: string[] | null | undefined): string => {
  if (!Array.isArray(urls) || urls.length === 0 || !urls[0]) {
    return "/images/placeholder.png"
  }
  return urls[0]
}


  return (
    <div className='bg-white p-4 mt-5 shadow-sm'>
        <table className='w-full divide-y'>
            <thead>
                <tr>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Image</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Activity Name</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Price</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Created At</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Action</th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
                {activityData.map((activity)=> (
                <tr key={activity.id} className='hover:bg-gray-100'>
                    <td className='px-6 py-4'><img src={activity.imageUrls?.[0] || "/images/placeholder.png"}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null; 
                          target.src = "/images/placeholder.png";
                        }}
                         alt='activity image' className='object-cover w-30 h-30 rounded-sm'/>
                    </td>
                    <td className='px-6 py-4'>{activity.title}</td>
                    <td className='px-6 py-4'>{formatCurrency(activity.price)}</td>
                    <td className='px-6 py-4'>{formatDate(activity.createdAt)}</td>
                    <td className='px-6 py-4 text-right'>
                        <div className='flex items-center justify-center gap-1'>
                        <EditButton id={activity.id}/>
                        <DeleteButton id={activity.id}/> 
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

export default ActivityTable