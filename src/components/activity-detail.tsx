import Image from "next/image"
import { getActivityDetailById } from "@/services/activityService"
import { notFound } from "next/navigation"
import { IoPeopleOutline } from "react-icons/io5"
import { formatCurrency } from "@/lib/utils"
import ReserveForm from "@/components/reserve-form"

const ActivityDetail = async ({activityId}:{activityId:string}) => {

    const activity = await getActivityDetailById(activityId)
    if(!activity) return notFound()

  return (
    <div className='max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto'>
        <div className="md:col-span-8">
            <Image src={activity.imageUrls[0]} alt={activity.title} width={770} height={430} priority className="w-full rounded-sm mb-8"/>
            <h1 className="text-5xl font-semibold text-gray-900 mb-8">{activity.title}</h1>
            <p>{activity.description}</p>
            <h5>{activity.facilities}</h5>
        </div>
        <div className="md:col-span-4">
            <div className="border-2 border-gray-300 border-dashed px-3 py-5 bg-slate-50 rounded-md">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <IoPeopleOutline className="size-4"/>
                        <span>1 People</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-semibold text-gray-600">{formatCurrency(activity.price)}</span>
                    </div>
                </div>
                {/* Reservation Form */}
                <ReserveForm activityId={activityId} />
            </div>
        </div>
    </div>
  )
}

export default ActivityDetail