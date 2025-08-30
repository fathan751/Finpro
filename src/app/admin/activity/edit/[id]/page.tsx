import { notFound } from 'next/navigation'
import EditActivityClient from './EditClient'

const UpdateActivityPage = async ({
  params
}: {
  params: { id: string }
}) => {
  const activityId = (await params).id

  if (!activityId) return notFound()

  return (
    <div className='max-w-screen-xl px-4 py-16 mt-10 mx-auto'>
        
        <EditActivityClient activityId={activityId}/>
    </div>
  )
}

export default UpdateActivityPage


