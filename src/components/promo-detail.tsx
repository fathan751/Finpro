"use client"

import { useEffect, useState } from "react"
import { IoPeopleOutline } from "react-icons/io5"
import { PromoProps } from "@/types/promo"
import { getPromoById } from "@/services/promoService"
import ReserveFormPromo from "./reserve-form-promo"

const PromoDetail = ({ promoId }: { promoId: string }) => {

  const [promos, setPromo] = useState<PromoProps|null>(null)

  useEffect(() => {
    const load = async() => {
        try {
            const data = await getPromoById(promoId)
            setPromo(data)
        } catch (error) {
            console.log(error)
        }
    }
    load()

  },[])


  if (!promos) return <p>Loading...</p>

  return (
    <div className='max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto'>
      <div className="md:col-span-8">
        <img
          src={promos.imageUrl}
          alt={promos.title}
          width={770}
          height={430}
          className="w-full rounded-sm mb-8"
        />
        <h1 className="text-5xl font-semibold text-gray-900 mb-8">{promos.title}</h1>
        <p>{promos.description}</p>
      </div>
      <div className="md:col-span-4">
        <div className="border-2 border-gray-300 border-dashed px-3 py-5 bg-slate-50 rounded-md">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <IoPeopleOutline className="size-4" />
              <span>1 People</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-600">
                Rp {promos.promo_discount_price?.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <ReserveFormPromo promoId={promoId} />
        </div>
      </div>
    </div>
  )
}

export default PromoDetail
