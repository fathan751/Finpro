"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import EditPromo from "@/components/admin/promo/edit-promo"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import axios from "axios"
import { BASE_URL } from "@/components/main"
import { API_KEY } from "@/components/main"
import { PromoProps } from "@/types/promo"

const EditPromoClient = ({promoId}:{promoId:string}) => {
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const [promoById,setPromoById] = useState<PromoProps|null>(null)

    const getPromoId = async () => {

        try {
            const resPromoId = await axios.get(`${BASE_URL}/api/v1/promo/${promoId}`,{
                headers:{
                    "apiKey" : API_KEY
                }
            })
            console.log(resPromoId)
            setPromoById(resPromoId.data.data)
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

        getPromoId()
    },[])

    if(loading) return <div>Loading...</div>

  return (

    <div className="px-4 py-16 mt-10 mx-auto flex flex-col">
        <Link href={"../"} className="w-fit self-end">
            <Button className="cursor-pointer">Back</Button>
        </Link>
        <Suspense fallback={<p>Loading...</p>}>
            {!promoById ? (<p>Loading activity data...</p>) : (<EditPromo promoData={promoById} promoId={promoId} />)}
      </Suspense>
    </div>
  )
}

export default EditPromoClient