"use client"
import { useRouter } from "next/navigation"
import EditCategory from "@/components/admin/category/edit-category"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import axios from "axios"
import { BASE_URL } from "@/components/main"
import { API_KEY } from "@/components/main"
import { CategoryProps } from "@/types/category"

const EditCategoryClient = ({categoryId}:{categoryId:string}) => {
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const [categoryById,setCategoryById] = useState<CategoryProps|null>(null)

    const getCategoryId = async () => {

        try {
            const resCategoryId = await axios.get(`${BASE_URL}/api/v1/category/${categoryId}`,{
                headers:{
                    "apiKey" : API_KEY
                }
            })
            console.log(resCategoryId)
            setCategoryById(resCategoryId.data.data)
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

        getCategoryId()
    },[])

    if(loading) return <div>Loading...</div>

  return (

    <div className="px-4 py-16 mt-10 mx-auto flex flex-col">
        <Link href={"../"} className="w-fit self-end">
            <Button className="cursor-pointer">Back</Button>
        </Link>
        <Suspense fallback={<p>Loading...</p>}>
            {!categoryById ? (<p>Loading activity data...</p>) : (<EditCategory categoryData={categoryById} categoryId={categoryId} />)}
      </Suspense>
    </div>
  )
}

export default EditCategoryClient