import { Suspense } from "react"
import PromoDetail from "@/components/promo-detail"

const PromoPageDetail = ({ params }: { params: { promoId: string } }) => {
  const { promoId } = params

  return (
    <div className="mt-20">
      <Suspense fallback={<p>Loading...</p>}>
        <PromoDetail promoId={promoId} />
      </Suspense>
    </div>
  )
}

export default PromoPageDetail
