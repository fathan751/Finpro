
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"
import Link from "next/link"

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
