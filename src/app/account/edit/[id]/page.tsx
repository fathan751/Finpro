import { notFound } from "next/navigation"
import EditUserClient from "./EditUserClient"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata ={
    title:"Edit-User",
    description:"Edit User Profile Page"
}

const EditUserPage = async ({params}:{params:{id:string}}) => {

    const userId = (await params).id

    if(!userId) return notFound

  return (
    <div className="max-w-screen-2xl px-4 py-16 mt-10 mx-auto">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Edit Profile</h1>
        <Link href={"../"} className="flex justify-end ">
            <p className="bg-[#ff385c] w-fit px-4 py-1 rounded-lg text-white">Back</p>
        </Link>
      </div>
      
        <EditUserClient userId={userId}/>
    </div>
  )
}

export default EditUserPage