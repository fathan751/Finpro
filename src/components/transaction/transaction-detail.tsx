"use client"

import Cookies from "js-cookie"
import { BASE_URL,API_KEY } from "@/lib/constant"
import axios from "axios"
import { useEffect, useState } from "react"
import { TransactionProps } from "@/types/transaction"
import { UserProps } from "@/types/user"
import { formatDate } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const TransactionDetail = ({transactionId}: {transactionId: string}) => {
    const token = Cookies.get(`token`)

    const [user,setUser] = useState<UserProps|null>(null)
    const [transactionById,setTransactionById] = useState<TransactionProps|null>(null)

    const fetchUser = async () => {
        
        try {
            const resUser = await axios.get(`${BASE_URL}/api/v1/user`,{
                headers:{
                    "apiKey" : API_KEY,
                    "Authorization" : `Bearer ${token}`
                }
            })
            console.log(resUser)
            setUser(resUser.data.data)
        } catch (error) {
            console.log(error)
        } 
    } 

    const getTransactionById = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/transaction/${transactionId}`,{
                headers:{
                    apiKey: API_KEY,
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            setTransactionById(res.data.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getTransactionById(),
        fetchUser()
    },[])

  return (
  <>
  <div className="flex justify-end w-full ">
    <Link href="./" className="bg-[#ff385c] px-3 py-1 mb-2 rounded-sm text-white">Back</Link>
  </div>
    <div className="w-full p-4 bg-white border border-gray-200 rounded-sm shadow">
        <button></button>
        <div className="grid md:grid-cols-2 md:gap-5">
            <ul>
                <li className="py2">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Reservation ID</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{transactionById?.id}</div>
                    </div>
                </li>

                <li className="py2">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Order Date</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{formatDate(transactionById?.orderDate.toString()??"")}</div>
                    </div>
                </li>

                <li className="py2">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Name </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{user?.name}</div>
                    </div>
                </li>

                <li className="py2">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Email</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{user?.email}</div>
                    </div>
                </li>
            </ul>

            <ul>
                <li className="py2">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Phone Number</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{user?.phoneNumber}</div>
                    </div>
                </li>

                <li className="py2">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Payment Method</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{transactionById?.payment_method.name}</div>
                    </div>
                </li>

                <li className="py2">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Payment Status</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{transactionById?.status}</div>
                    </div>
                </li>
            </ul>
        </div>
        {/* table */}
        <div className="relative overflow-x-auto mt-3 py-6">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py3">Activity</th>
                        <th className="px-6 py3 min-w-60 md:min-w-0">invoiceId</th>
                        <th className="px-6 py3">Expire Date</th>
                        <th className="px-6 py3 text-right">Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b">
                        <td className="px-6 py-4">
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-900 whitespace-nowrap">{transactionById?.transaction_items[0]?.title}</span>
                                <span>{formatCurrency(transactionById?.transaction_items[0]?.price??0)}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">{transactionById?.invoiceId}</td>
                        <td className="px-6 py-4">{formatDate(transactionById?.expiredDate??"")}</td>
                        <td className="px-6 py-4 text-right">{formatCurrency(transactionById?.totalAmount??0)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className="px-6 py-3 font-bold" colSpan={2}>Total</td>
                        <td className="px-6 py-3 font-bold text-right" colSpan={3}>{formatCurrency(transactionById?.totalAmount??0)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</>
  )
}

export default TransactionDetail