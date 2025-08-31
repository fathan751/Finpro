"use client"

import React, { useEffect, useState } from 'react'
import { formatDate,formatCurrency } from '@/lib/utils'
import Cookies from 'js-cookie'
import { TransactionProps } from '@/types/transaction'
import { getAllTransaction } from '@/services/TransactionService'

const ReservationList = () => {

    const [allTransaction,setAllTransaction] =  useState<TransactionProps[]>([])
    const token = Cookies.get("token")

    useEffect(() => {
        const load = async () =>{
            const res = await getAllTransaction(token??"")
            setAllTransaction(res)
        }
        load()
    },[])


  return (
    <div className='bg-white p-4 mt-5 shadow-sm overflow-x-scroll'>
        <table className='w-full divide-y'>
            <thead>
                <tr>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Transaction Id</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Invoice</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Order Date</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Status</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Created At</th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
                {allTransaction.map((item)=> (
                <tr key={item.id} className='hover:bg-gray-100'>
                    <td className='px-6 py-4'>{item.id}</td>
                    <td className='px-6 py-4'>{item.invoiceId}</td>
                    <td className='px-6 py-4'>{formatDate(item.orderDate)??""}</td>
                    <td className='px-6 py-4 text-right'>
                        {item.status}
                    </td>
                    <td className='px-6 py-4'>{formatCurrency(item.totalAmount)??0}</td>
                </tr>
                ))
            }
            </tbody>
        </table>
    </div>
  )
}

export default ReservationList