import { PromoProps } from "@/types/promo"
import EditPromoForm from "./edit-form-promo"

interface EditPromoProps {
    promoData: PromoProps,
    promoId: string
}

const EditPromo = ({promoData,promoId}:EditPromoProps) => {
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Edit a Promo</h1>
        <EditPromoForm promoData={promoData} promoId={promoId}/>
    </div>
  )
}

export default EditPromo