"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { getAllTransaction } from "@/services/TransactionService"
import { TransactionProps } from "@/types/transaction"
import { formatDate,formatCurrency } from "@/lib/utils"
import axios from "axios"
import { BASE_URL,API_KEY } from "@/lib/constant"
import {toast} from "sonner"
import { Button } from "@/components/ui/button"
import { stat } from "fs"

const TransactionTable = () => {

    const [transactions,setTransactions] = useState<TransactionProps[]>([])
    const token = Cookies.get("token")

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAllTransaction(token??"")
                setTransactions(data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
    },[])

    const handleApprove = async (status:string,transId:string) => {

        const payload = {
            status: status
        }
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/update-transaction-status/${transId}`,payload,{
                headers:{
                    apiKey: API_KEY,
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            toast.success(res.data.message)

            setTransactions((prev) => prev.map((t) => t.id === transId?{...t,status:status}:t))

        } catch (error:any) {
            console.log(error)
            toast.error(error.response.data.errors)
        }
    }

  return (
    <div className='bg-white p-4 mt-5 shadow-sm overflow-x-scroll'>
            <table className='w-full divide-y'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>User Id</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Invoice ID</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Order Date</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Total Amount</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Proof Payment</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Status Payment</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {transactions.map((trans)=> (
                    <tr key={trans.id} className='hover:bg-gray-100'>
                        <td className='px-6 py-4'>{trans.userId}</td>
                        <td className='px-6 py-4'>{trans.invoiceId}</td>
                        <td className='px-6 py-4'>{formatDate(trans.orderDate)}</td>
                        <td className="px-6 py-4">{formatCurrency(trans.totalAmount)}</td>
                        <td className='px-6 py-4'>{trans.proofPaymentUrl ? 
                        (<img src={trans.proofPaymentUrl} alt="Proof of Payment" className="w-24 h-24 object-cover rounded" />) :
                         (<span className="text-gray-500">not yet paid </span>)}
                        </td>
                        <td className="px-6 py-4">{trans.status}</td>
                        <td className='px-6 py-4 text-right'>
                            <div className="flex items-center gap-2 justify-center">
                                <Button className="bg-green-600 hover:bg-green-400 cursor-pointer" onClick={() => handleApprove("success",trans.id)}>Accept</Button>
                                <Button className="bg-red-600 hover:bg-red-400 cursor-pointer" onClick={() => handleApprove("failed",trans.id)}>Decline</Button>
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

export default TransactionTable