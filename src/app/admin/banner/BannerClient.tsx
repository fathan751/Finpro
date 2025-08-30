"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Suspense } from "react"
import BannerTable from "@/components/admin/banner/banner-table"

const BannerClient = () => {

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
            <BannerTable/>
        </Suspense>
    </div>
  )
}

export default BannerClient