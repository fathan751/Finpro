import { notFound } from "next/navigation"
import EditCategoryClient from "./EditCategoryClient"

const UpdateCategoryPage = async ({params}:{params:{id: string}}) => {

  const categoryId = (await params).id

  if(!categoryId) return notFound()

  return (
    <div className='max-w-screen-xl px-4 py-16 mt-10 mx-auto'>
        <EditCategoryClient categoryId={categoryId}/>
    </div>
  )
}

export default UpdateCategoryPage