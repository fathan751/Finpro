import { Button } from "@/components/ui/button"
import axios from "axios"
import { BASE_URL,API_KEY } from "@/lib/constant"
import Cookies from "js-cookie"
import { toast } from "sonner"

interface DeleteModalProps{
    onClose: () => void,
    onConfirm: () => void
    id:string
}

const DeletePromoModal = ({onClose,onConfirm,id}:DeleteModalProps) => {

    const token = Cookies.get("token")

    const handleDeletePromo = async () => {

        try {
            const resDelete = await axios.delete(`${BASE_URL}/api/v1/delete-promo/${id}`,{
                headers:{
                    apiKey:API_KEY,
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(resDelete)
            onConfirm()
            toast.success(resDelete.data.message)
        } catch (error:any) {
            console.log(error)
            toast.error(error.data.message||"Failed To Delete")
        }
    }

  return (
    <div className="fixed z-10 inset-0 flex justify-center items-center">
        <div className="absolute inset-0 bg-black/50" onClick={onClose}/>

        <div className="relative flex flex-col items-stretch shadow bg-white px-6 py-3 gap-3  w-full max-w-[600px] rounded-lg">
            <h1 className="text-lg font-semibold text-start">Are you absolutely sure?</h1>
            <p className="text-gray-500 text-sm text-start">This action cannot be undone. This will permanently delete and remove your data from our servers.</p>
            <div className="flex justify-end gap-3">
                <Button className="text-black bg-white border hover:bg-gray-100 shadow hover:scale-125 cursor-pointer" onClick={onClose}>Cancel</Button>
                <Button variant={"destructive"} className="hover:scale-115 cursor-pointer" onClick={handleDeletePromo}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default DeletePromoModal