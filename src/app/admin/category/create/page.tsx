import { Metadata } from "next"
import CreateCategoryClient from "./CreateCategoryClient"

export const metadata: Metadata = {
  title:"Create Activity",
  description:"Create Activity Page"
}

const CreateCategoryPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
        <CreateCategoryClient/>
    </div>
  )
}

export default CreateCategoryPage