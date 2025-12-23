import { Metadata } from 'next'
import { Suspense } from 'react'
import ActivityDetail from '@/components/activity-detail'
import LoadingPage from '@/components/skeletons/LoadingPage'

export const metadata: Metadata = {
    title:"Activity Detail"
}

const ActivityDetailPage = async({params,}:{params:{activityId: string}}) => {
    const {activityId} = params

  return (
    <div className='mt-20'> 
      <Suspense fallback={<LoadingPage/>}>
        <ActivityDetail activityId={activityId}/>
      </Suspense>
    </div>
  )
}

export default ActivityDetailPage