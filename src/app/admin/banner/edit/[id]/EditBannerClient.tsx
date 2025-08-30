"use client"
import { useRouter } from "next/navigation"
import EditBanner from "@/components/admin/banner/edit-banner"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import axios from "axios"
import { BASE_URL } from "@/components/main"
import { API_KEY } from "@/components/main"
import { BannerProps } from "@/types/banner"

const EditBannerClient = ({bannerId}:{bannerId:string}) => {
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const [bannerById,setBannerById] = useState<BannerProps|null>(null)

    const getBannerId = async () => {

        try {
            const resBannerId = await axios.get(`${BASE_URL}/api/v1/banner/${bannerId}`,{
                headers:{
                    "apiKey" : API_KEY
                }
            })
            console.log(resBannerId)
            setBannerById(resBannerId.data.data)
        } catch (err:any) {
            console.log(err)
        }
    } 

    useEffect(() => {
        const token = Cookies.get("token")
        const role = Cookies.get("role")

        if(!token || role !== "admin"){
            router.replace("/")
        }else{
            setLoading(false)
        }

        getBannerId()
    },[])

    if(loading) return <div>Loading...</div>

  return (

    <div className="px-4 py-16 mt-10 mx-auto flex flex-col">
        <Link href={"../"} className="w-fit self-end">
            <Button className="cursor-pointer">Back</Button>
        </Link>
        <Suspense fallback={<p>Loading...</p>}>
            {!bannerById ? (<p>Loading activity data...</p>) : (<EditBanner bannerData={bannerById} bannerId={bannerId} />)}
      </Suspense>
    </div>
  )
}

export default EditBannerClient