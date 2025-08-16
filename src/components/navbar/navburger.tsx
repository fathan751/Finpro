'use client'

import Link from "next/link"
import {IoClose,IoMenu,IoPeople} from "react-icons/io5"
import { useEffect, useState } from "react"
import Navlanguage from "./_components/navlanguage"
import LoginModal from "./_components/loginmodal"



const Navburger = () => {



    const [token,setToken] = useState<string|null>(null)
    const [open,setOpen] = useState(false)
    const [openLogin, setOpenLogin] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    },[])


  return (
    <div className="flex gap-5">
        <button onClick={() => setOpenLogin(!openLogin)} className={token?"hidden":"md:block hidden self-center bg-[#ff385c] hover:bg-red-300 px-5 py-2 rounded-sm text-[#f8f2de]"}>Login</button>
        <button onClick={handleLogout} className={token?"md:block hidden self-center bg-[#ff385c] hover:bg-red-300 px-5 py-2 rounded-sm text-[#f8f2de]":"hidden"}>Logout</button>
        
      {openLogin && <LoginModal onClose={() => setOpenLogin(!openLogin)} />}
        <Navlanguage/>
        <button onClick={() => setOpen(!open)} className="  p-2  text-sm text-gray-500 rounded-md hover:bg-gray-100">
            {!open? <IoMenu className="size-8"/> : <IoClose className="size-8"/>}
        </button>

        <div className={open?`fixed top-20 lg:top-22 right-0  2xl:right-5  rounded-xl  bg-[#efefef] w-[200px] h-screen lg:h-1/2  lg:w-[250px]`:"hidden"}>
          <ul className="p-4 flex flex-col gap-5">
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/'}>
                    Home
                </Link>
            </li>
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/mybooking'}>
                   My Booking
                </Link>
            </li>
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/contact'}>
                    Contact Us
                </Link>
            </li>
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/about'}>
                    About Us
                </Link>
            </li>
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/Login'} className="flex items-center gap-3">
                  <IoPeople/>Account
                </Link>
            </li>

          </ul>
        </div>
    </div>
  )
}

export default Navburger