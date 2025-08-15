'use client'

import Link from "next/link"
import {IoClose,IoMenu} from "react-icons/io5"
import { useState } from "react"
import Navlanguage from "./_components/navlanguage"

const Navburger = () => {

    const [open,setOpen] = useState(false)


  return (
    <div className="flex gap-5">
        <div className="md:block hidden self-center bg-[#ff385c] hover:bg-red-300 px-5 py-2 rounded-sm text-[#f8f2de]"><Link href={'/login'}>Sign in</Link></div>
        <Navlanguage/>
        <button onClick={() => setOpen(!open)} className="  p-2  text-sm text-gray-500 rounded-md hover:bg-gray-100">
            {!open? <IoMenu className="size-8"/> : <IoClose className="size-8"/>}
        </button>

        <div className={open?`fixed top-22 right-0  2xl:right-5  rounded-xl  bg-[#efefef] w-[150px] lg:w-[250px]`:"hidden"}>
          <ul className="p-4 flex flex-col gap-5">
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/'}>
                    Home
                </Link>
            </li>
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/Login'}>
                    Log in / Register
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

          </ul>
        </div>
    </div>
  )
}

export default Navburger