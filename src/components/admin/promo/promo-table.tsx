"use client"

import { useEffect, useState } from "react"
import { fetchPromo } from "@/services/promoService"
import { formatDate } from "@/lib/utils"
import { PromoProps } from "@/types/promo"
import { DeletePromoButton,EditPromoButton } from "./buttonPromo"
import { Delete } from "lucide-react"

const PromoTable = () => {

    const [promos,setPromos] = useState<PromoProps[]>([])
    const handleDeleteSuccess = (deletedId: string) => {
        setPromos(prev => prev.filter(promo => promo.id !== deletedId))
    }

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchPromo()
                setPromos(data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
    },[])

  return (
    <div className='bg-white p-4 mt-5 shadow-sm overflow-x-scroll'>
            <table className='w-full divide-y'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Image</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Promo Name</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Minimum Claim Price</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Created At</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Updated At</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {promos.map((promo)=> (
                    <tr key={promo.id} className='hover:bg-gray-100'>
                        <td className='px-6 py-4'><img src={promo.imageUrl || "/images/placeholder.png"}
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null; 
                              target.src = "/images/placeholder.png";
                            }}
                             alt='promo image' className='object-cover min-w-30 min-h-30 md:w-45 md:h-45 rounded-lg'/>
                        </td>
                        <td className='px-6 py-4'>{promo.title}</td>
                        <td className='px-6 py-4'>{promo.minimum_claim_price}</td>
                        <td className="px-6 py-4">{formatDate(promo.createdAt)}</td>
                        <td className="px-6 py-4">{formatDate(promo.updatedAt)}</td>
                        <td className='px-6 py-4 text-right'>
                            <div className='flex items-center justify-center gap-1'>
                            <EditPromoButton id={promo.id}/>
                            <DeletePromoButton id={promo.id} onSuccess={() => handleDeleteSuccess(promo.id)}/>
                            </div>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
  )
}

export default PromoTable