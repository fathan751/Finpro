import { Metadata } from "next"
import Headersection from "@/components/header-section"
import { Suspense } from "react"
import Main from "@/components/main"
import ActivitySkeleton from "@/components/skeletons/activity-skeleton"

export const metadata:Metadata = {
    title:"Activity & Rates",
    description:"Choose Your best Activity Today"
}

const RoomPage = () => {
  return (
    <div>
        <Headersection title="Activity & Rates" subTitle="Lorem ipsum dolor sit amet."/>
        <div className="mt-10">
            <Suspense fallback={<ActivitySkeleton/>}>
                <Main/>
            </Suspense>
        </div>
    </div>
  )
}

export default RoomPage