
import { UserProps } from "@/types/user"
import Link from "next/link"

const AccountForm = ({user}:{user:UserProps|null}) => {
  return (
    <div className='bg-white max-h-screen mt-10 pb-10'>
        <div className='h-[100px] rounded-t-xl bg-gradient-to-r from-[#ff385c] to-[#a31d1d]'></div>
        <div className="mt-7 px-10 flex items-center justify-between">
            <div className="flex items-center space-x-5">
            <img src={user?.profilePictureUrl ?? "images/placeholder.png"} alt="Profile Picture" width={100} height={100} className="rounded-full"/>
            <div>
                <p className="font-semibold">{user?.name}</p>
                <p>{user?.email}</p>
            </div>
            </div>

            <Link href={`/account/edit/${user?.id}`}>
            <p className="bg-[#ff385c] rounded-sm text-white py-2 px-6">edit</p>
            </Link>
        </div>

        <div className="px-10 flex flex-col gap-3 mt-5">
            <p className="font-semibold">Role: <span className="bg-[#efefef] px-4 w-28 rounded-lg py-2">{user?.role}</span></p>
            
            <p>Phone Number: {user?.phoneNumber}</p>
        </div>
        
    </div>
  )
}

export default AccountForm