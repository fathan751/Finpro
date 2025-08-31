"use client"
import { useEffect, useState } from "react"
import {LuChartArea,LuShoppingCart,LuUsers} from "react-icons/lu"
import { TransactionProps } from "@/types/transaction"
import { getAllTransaction } from "@/services/TransactionService"
import Cookies from "js-cookie"
import { formatCurrency } from "@/lib/utils"

const DashboardCards = () => {

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
    <div className='grid md:grid-cols-3 gap-5 pb-10 mt-5'>
        <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
            <div className="p-4 bg-green-400">
                <LuChartArea className="size-12 text-white"/>
            </div>
            <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Revenue</h3>
                <p className="text-3xl">{formatCurrency(allTransaction.reduce((acc,val) => acc+val.totalAmount,0))}</p>
            </div>
        </div>
        <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
            <div className="p-4 bg-red-400">
                <LuShoppingCart className="size-12 text-white"/>
            </div>
            <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Reservation</h3>
                <p className="text-3xl">{allTransaction.filter(item => item.status === "success").length}</p>
            </div>
        </div>
        <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
            <div className="p-4 bg-blue-400">
                <LuUsers className="size-12 text-white"/>
            </div>
            <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Customer</h3>
                <p className="text-3xl">{allTransaction.length}</p>
            </div>
        </div>
    </div>
  )
}

export default DashboardCards