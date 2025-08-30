"use client"

import Link from "next/link"
import { BASE_URL, API_KEY } from "@/components/main"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"


interface DeleteButtonProps {
  id: string
  onSuccess: () => void
}
interface EditButtonProps{
  id: string
}

export const EditCategoryButton = ({ id }: EditButtonProps) => {
  return (
   <Link href={`/admin/category/edit/${id}`}>
    <Button className="hover:scale-125 hover:cursor-pointer font-medium bg-blue-600 hover:bg-blue-900">
        <PencilIcon/>
    </Button>
   </Link>
  )
}

export const DeleteCategoryButton = ({ id,onSuccess }: DeleteButtonProps) => {
  const handleDelete = async () => {
    const adminToken = Cookies.get("token")

    try {
        const res = await fetch(`${BASE_URL}/api/v1/delete-category/${id}`,{
            method:"DELETE",
            headers:{
                Authorization : `Bearer ${adminToken}`,
                "apiKey" : `${API_KEY}`
            }
        })
        console.log(res)
        toast.success("Category Deleted Successfully")
        onSuccess()
    } catch (err: any) {
      console.error(err)
      toast.error(err.data.message || "Failed to delete activity")
    }
  }

  return (
    <Button
      onClick={handleDelete}
      className="hover:scale-125 hover:cursor-pointer font-medium bg-[#ff385c]"
      variant={"destructive"}
    >
      <Trash/>
    </Button>
  )
}