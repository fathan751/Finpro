"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Suspense } from "react"
import TransactionTable from "@/components/admin/transaction/transaction-table"

const TransactionClient = () => {

    const router = useRouter()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const token = Cookies.get("token")
        const role = Cookies.get("role")

        if(!token || role !== "admin") {
            router.replace("/")
        }else{
            setLoading(false)
        }
    },[])

    if(loading) return <div>Loading...⏳⏱ </div>

  return (
    <div>
        <Suspense fallback={<div>Loading Data...</div>}>
            <TransactionTable/>
        </Suspense>
    </div>
  )
}

export default TransactionClient