import { notFound } from "next/navigation"
import EditBannerClient from "./EditBannerClient"

const UpdateCategoryPage = async ({params}:{params:{id: string}}) => {

  const bannerId = (await params).id

  if(!bannerId) return notFound()

  return (
    <div className='max-w-screen-xl px-4 py-16 mt-10 mx-auto'>
        <EditBannerClient bannerId={bannerId}/>
    </div>
  )
}

export default UpdateCategoryPage