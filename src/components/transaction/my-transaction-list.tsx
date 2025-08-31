"use client"

import { TransactionProps } from "@/types/transaction"
import { useEffect, useState } from "react"
import { getMyTransaction } from "@/services/TransactionService"
import { formatCurrency } from "@/lib/utils"
import Cookies from "js-cookie"
import { toast } from "sonner"
import Link from "next/link"
import { uploadImage } from "@/services/UploadImageService"
import { updatePaymentProof } from "@/services/UploadPayment"
import { Button } from "../ui/button"

const MyTransactionList = () => {

    const [transactions,setTransactions] = useState<TransactionProps[]>([])

    const token = Cookies.get("token")
    useEffect(() => {
        const load = async() =>{
            try {
                const data = await getMyTransaction(token??"")
                setTransactions(data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
    },[])

     const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, transactionId: string) => {
  const selectedFile = e.target.files?.[0]
  if (!selectedFile) return

  const maxSize = 1 * 1024 * 1024
  if (selectedFile.size > maxSize) {
    toast.error("File size exceeds 1MB")
    return
  }

  try {
    const proofPaymentUrl = await uploadImage(selectedFile)

    const res = await updatePaymentProof(token ?? "", transactionId, proofPaymentUrl)
    console.log(res)
    toast.success(res.message ?? "Payment proof uploaded")
  } catch (err) {
    console.error(err)
    toast.error("Failed to upload payment proof")
  }
}


  return (
    <div>
        {transactions.map((item) =>(
            <div key={item.id}  className="bg-white shadow pb-4 mb-4 md:pb-0 relative">
            <div className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded-t-sm">
                <h1 className='text-sm font-medium text-gray-900 truncate'>Transaction ID: #{item.id}</h1>
                <div className="flex gap-1 px-3 py-2 text-sm font-normal">
                    <span>Status:</span>
                    <span className='font-bold uppercase'>{item.status}</span>
                </div>
            </div>
            <div className="flex flex-col mb-4 items-start bg-white rounded-sm md:flex-row md:w-full">
                <img src={item.transaction_items[0]?.imageUrls[0]?? "/images/placeholder.png"} className="object-cover object-center rounded-t-sm w-full h-60 md:max-w-[350px] md:rounded-none md:rounded-s-sm" alt="image activity"/>
                <div className="flex items-center gap-1 mt-2 mb-3 px-2 font-normal text-gray-700 w-full">
                    <div className="w-full">
                        <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                            <span>Price</span>
                            <span>{formatCurrency(item.totalAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                            <span>Arrival</span>
                            <span>arrival</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                            <span>Departure</span>
                            <span>departure</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                            <span>Duration</span>
                            <span>duration</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                            <span>Sub Total</span>
                            <span>sub Total</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-end absolute inset-4">
                {item.status.toLowerCase() === "pending"?
                <div>
                <input 
                type="file"
                accept="image/*"
                id={`file-${item.id}`}
                className="hidden"
                onChange={(e) => handleUpload(e, item.id)}
      />
                <label htmlFor={`file-${item.id}`} className="px-3 py-2 bg-[#dd1d1d] text-white rounded cursor-pointer">
                  Upload Payment
                </label>
                </div>:<Link href={`/my-transaction/${item.id}`}>
                    <button className="px-3 py-2 bg-[#ff385c] hover:bg-red-300 text-white rounded cursor-pointer">View Detail</button>
                </Link>
                }
                
            </div>
        </div>
        ))}
        
    </div>
  )
}

export default MyTransactionList