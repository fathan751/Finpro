"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Suspense } from "react"
import PromoTable from "@/components/admin/promo/promo-table"

const PromoClient = () => {

    const [loading,setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        
        const token = Cookies.get("token")
        const role = Cookies.get("role")

        if(!token && role !== "admin"){
            router.replace("/")
        }else{
            setLoading(false)
        }
    })

    if(loading) return <div>Loading...⏳⌛⌚</div>

  return (
    <Suspense fallback={<div>Loading Data...</div>}>
        <PromoTable/>
    </Suspense>
  )
}

export default PromoClient