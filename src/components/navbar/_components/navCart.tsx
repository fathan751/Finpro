'use client'
import Image from "next/image"
import { IoCart } from "react-icons/io5"
import Link from "next/link"

const NavCart = () => {
  return (
    <>
    <Link href={"/cart"}>
    <button className="hidden md:block cursor-pointer self-center rounded-full bg-[#efefef]">
      <IoCart width={40} height={40} className="size-8"/>
        </button>
        </Link>
    </>
  )
}

export default NavCart