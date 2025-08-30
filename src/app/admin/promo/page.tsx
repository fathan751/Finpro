import PromoClient from "./PromoClient"
import Link from "next/link"

const PromoPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-800">Promo List</h1>
            <Link href="/admin/promo/create" className="bg-[#ff385c] px-6 py-2.5 hover:bg-[#a31d1d] text-white font-bold">Create New</Link>
        </div>
        <PromoClient/>
    </div>
  )
}

export default PromoPage