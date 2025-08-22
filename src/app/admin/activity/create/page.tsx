import { Metadata } from "next"
import CreateClient from "./CreateClient"

export const metadata: Metadata = {
  title:"Create Activity",
  description:"Create Activity Page"
}

const CreateActivityPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
        <CreateClient/>
    </div>
  )
}

export default CreateActivityPage