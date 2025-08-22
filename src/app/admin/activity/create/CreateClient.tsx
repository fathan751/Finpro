"use client"
import Createactivity from "@/components/admin/activity/create-activity"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CreateClient = () => {
    const router = useRouter()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const token = Cookies.get("token")
        const role = Cookies.get("role")

        if(!token || role !== "admin"){
            router.replace("/")
        }else{
            setLoading(false)
        }
    },[])

    if(loading) return <div>Loading...</div>

  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto flex flex-col">
        <Link href={"./"} className="w-fit self-end">
        <Button className="cursor-pointer">Back</Button>
        </Link>
        <Createactivity/>
    </div>
  )
}

export default CreateClient