import { notFound } from "next/navigation"
import EditPromoClient from "./EditPromoClient"
import { Metadata } from "next"

export const metadata:Metadata = {
    title:"Edit Promo",
    description: "Edit Promo Page"
}

const UpdatePromoPage = async ({params}:{params:{id: string}}) => {

  const promoId = (await params).id

  if(!promoId) return notFound()

  return (
    <div className='max-w-screen-xl px-4 py-16 mt-10 mx-auto'>
        <EditPromoClient promoId={promoId}/>
    </div>
  )
}

export default UpdatePromoPage