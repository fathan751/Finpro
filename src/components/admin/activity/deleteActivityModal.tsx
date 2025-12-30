import { Button } from "@/components/ui/button"
import { BASE_URL,API_KEY } from "@/lib/constant"
import Cookies from "js-cookie"
import {toast} from "sonner"

interface DeleteActivityProps{
    onConfirm : () => void
    onClose: () => void
    id:string
}


const DeleteActivityModal = ({onConfirm,onClose,id}:DeleteActivityProps) => {

    const token = Cookies.get("token")

    const handleDeleteActivity = async () => {
        
        if (!API_KEY) {
            throw new Error("API_KEY is missing")
            }

        try {
            const resDelete = await fetch(`${BASE_URL}/api/v1/delete-activity/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`,
                    apiKey: API_KEY as string
                }
            })
            console.log(resDelete)
            onConfirm()
            toast.success("Activity Deleted Successfully")

            if(!resDelete.ok){
                const err = await resDelete.json()
                throw new Error(err.message || "Failed to delete Activity")
            }

        } catch (err:any) {
            console.error(err)
            toast.error(err.data.message || "Failed to delete Activity")
        }
    }

  return (

    <div className="inset-0 fixed z-10 flex items-center justify-center">
        <div onClick={onClose} className="absolute inset-0 bg-black/50"/>

        <div className="relative bg-white rounded-lg shadow flex flex-col max-w-[600px] gap-3 px-6 py-3">
            <h1 className="font-semibold text-lg text-start">Are you absolutely sure?</h1>
            <p className="text-gray-500 text-sm text-start">This action cannot be undone. This will permanently delete and remove your data from our servers.</p>
            <div className="flex justify-end gap-2">
                <Button onClick={onClose} className="cursor-pointer hover:scale-125" variant={"outline"}>Cancel</Button>
                <Button onClick={handleDeleteActivity} className="cursor-pointer hover:scale-125" variant={"destructive"}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default DeleteActivityModal