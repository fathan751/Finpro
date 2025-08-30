"use client"

import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import Cookies from "js-cookie"
import { BASE_URL,API_KEY } from "@/components/main"
import { toast } from "sonner"
import axios from "axios"
import { error } from "console"

interface DeleteButtonProps{
    id: string
    onSuccess: () => void
}

interface EditButtonProps{
    id: string
}

export const EditPromoButton = ({id}:EditButtonProps) => {
    return (
        <Link href={`/admin/promo/edit/${id}`}>
            <Button className="hover:scale-125 hover:cursor-pointer font-medium bg-blue-600 hover:bg-blue-900">
                <PencilIcon/>
            </Button>
        </Link>
    )
}

export const DeletePromoButton = ({id,onSuccess}:DeleteButtonProps) => {

    const handleDelete = async () => {
    const token = Cookies.get("token")

    try {
        const resDelete = await axios.delete(`${BASE_URL}/api/v1/delete-promo/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
                apiKey : API_KEY
            }
        })

        console.log(resDelete)
        toast.success(resDelete.data.message || "Promo Deleted Successfully")
        onSuccess()
    } catch (error:any) {
        console.log(error)
        toast.error(error.data.message || "Failed To Delete Activity")
    }
    }


    return(
        <Button
        onClick={handleDelete}
        className="hover:scale-125 hover:cursor-pointer font-medium bg-[#ff385c]"
        variant={"destructive"}
        >
            <TrashIcon/>
        </Button>
    )
}