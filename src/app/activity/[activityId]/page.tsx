import { Metadata } from 'next'
import { Suspense } from 'react'
import ActivityDetail from '@/components/activity-detail'

export const metadata: Metadata = {
    title:"Activity Detail"
}

const ActivityDetailPage = async({params}:{params:Promise<{activityId: string}>}) => {
    const activityId = (await params).activityId

  return (
    <div className='mt-20'> 
      <Suspense fallback={<p>Loading...</p>}>
        <ActivityDetail activityId={activityId}/>
      </Suspense>
    </div>
  )
}

export default ActivityDetailPage