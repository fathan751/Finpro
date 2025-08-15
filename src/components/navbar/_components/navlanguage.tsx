'use client'
import Image from "next/image"

const Navlanguage = () => {
  return (
    <button className="hidden md:block self-center rounded-full bg-[#efefef]">
            <Image src={'/images/globe.png'} width={25} height={25} alt="globe"/>
        </button>
  )
}

export default Navlanguage