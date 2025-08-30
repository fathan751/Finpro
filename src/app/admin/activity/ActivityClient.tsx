"use client"
import Cookies from "js-cookie"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import ActivityTable from "@/components/admin/activity/activity-table"
import { Suspense } from "react"

const ActivityClient = () => {

    const [loading,setLoading] = useState(true)

    const router = useRouter()


    useEffect(() => {
        const token = Cookies.get("token")
        const role = Cookies.get("role")
        
        if(!token || role !== "admin"){
            router.replace("/")
        }else{
            setLoading(false)
        }
        
    },[])
    
    if(loading) return <div>Loading...⏳⏱ </div>

  return (
        <Suspense fallback={<p>Loading Data...</p>}>
                <ActivityTable/>
        </Suspense>
    
  )
}

export default ActivityClient