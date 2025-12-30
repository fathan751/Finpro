
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"

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

