import { Metadata } from "next"
import Headersection from "@/components/header-section"
import { Suspense } from "react"
import ActivitySkeleton from "@/components/skeletons/activity-skeleton"
import MainActivity from "@/components/main-activity"

export const metadata:Metadata = {
    title:"Activity & Rates",
    description:"Choose Your best Activity Today"
}

const ActivityPage = () => {
  return (
    <div>
        <Headersection title="Activity & Rates" subTitle="Lorem ipsum dolor sit amet."/>
        <div className="mt-10">
            <Suspense fallback={<ActivitySkeleton/>}>
                <MainActivity/>
            </Suspense>
        </div>
    </div>
  )
}

export default ActivityPage