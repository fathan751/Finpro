import EditActivityForm from "./edit-form-activity"
import { ActivityProps } from "@/types/activity"

interface EditActivtyProps {
    activityData: ActivityProps,
    activityId: string
}

const EditActivity = ({activityData,activityId}:EditActivtyProps) => {
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Edit a Activity</h1>
        <EditActivityForm activityData={activityData} activityId={activityId}/>
    </div>
  )
}

export default EditActivity