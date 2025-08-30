import { Metadata } from "next"
import CreateBannerClient from "./CreateBannerClient"

export const metadata: Metadata = {
  title:"Create Banner",
  description:"Create Banner Page"
}

const CreateCategoryPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
        <CreateBannerClient/>
    </div>
  )
}

export default CreateCategoryPage