"use client"

import React, { useEffect, useState } from 'react'
import { BASE_URL, API_KEY } from '@/components/main'
import axios from 'axios'
import { ActivityProps } from '@/types/activity'
import { formatDate,formatCurrency } from '@/lib/utils'
import { EditActivityButton } from './buttonActivity'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import DeleteActivityModal from './deleteActivityModal'

const ActivityTable = () => {

    const apiKey = API_KEY
    const baseUrl = BASE_URL

    const [activityData,setActivityData] = useState<ActivityProps[]>([])
    const [selectedActivityId,setSelectedActivityId] = useState<null|string>(null)
    const handleDeleteSuccess = (deletedId:string) => {
        setActivityData(prev => prev.filter(activity => activity.id !== deletedId))
    }


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


  return (
    <div className='bg-white p-4 mt-5 shadow-sm overflow-x-scroll'>
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
                {[...activityData].reverse().map((activity)=> (
                <tr key={activity.id} className='hover:bg-gray-100'>
                    <td className='px-6 py-4'><img src={activity.imageUrls?.[0] || "/images/placeholder.png"}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null; 
                          target.src = "/images/placeholder.png";
                        }}
                         alt='activity image' className='object-cover min-w-30 min-h-30 md:w-45 md:h-45 rounded-lg'/>
                    </td>
                    <td className='px-6 py-4'>{activity.title}</td>
                    <td className='px-6 py-4'>{formatCurrency(activity.price)}</td>
                    <td className='px-6 py-4'>{formatDate(activity.createdAt)}</td>
                    <td className='px-6 py-4 text-right'>
                        <div className='flex items-center justify-center gap-1'>
                        <EditActivityButton id={activity.id}/>
                        <Button
                             variant={"destructive"}
                            className="cursor-pointer hover:scale-125 bg-[#ff385c]"
                            onClick={() => setSelectedActivityId(activity.id)}
                            >
                                <TrashIcon/>
                            </Button>
                            {selectedActivityId === activity.id && (
                               <DeleteActivityModal
                                onConfirm = {() => handleDeleteSuccess(activity.id)}
                                onClose = {() => setSelectedActivityId(null)}
                                id={activity.id}
                               />
                            )}
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