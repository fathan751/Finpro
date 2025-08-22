"use client"

import Link from "next/link"
import { IoPeopleOutline } from "react-icons/io5"
import { useState, useEffect } from "react"

interface CardProps {
  title: string
  imageUrls: string
}

const Card = ({ title, imageUrls }: CardProps) => {
  const fallback = "/images/placeholder.png"
  const [imageSrc, setImageSrc] = useState(fallback)

  useEffect(() => {
    if (!imageUrls || imageUrls.trim() === "") {
      setImageSrc(fallback)
      return
    }

    const img = new Image()
    img.onload = () => setImageSrc(imageUrls)
    img.onerror = () => setImageSrc(fallback)
    img.src = imageUrls
  }, [imageUrls])

  return (
    <div className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm">
      <div className="h-[260px] w-auto rounded-t-sm relative">
        <img
          src={imageSrc}
          alt="room image"
          className="w-full h-full object-fill rounded-t-sm"
        />
      </div>
      <div className="p-8">
        <h4 className="text-2xl font-medium">
          <Link href="#" className="hover:text-gray-800 transition duration-150">
            {title}
          </Link>
        </h4>
        <h4 className="text-2xl mb-7">
          <span className="font-semibold text-gray-600">Rp 2100000</span>
          <span className="font-semibold text-gray-400 text-sm">/Trip</span>
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IoPeopleOutline />
            <span>2 people</span>
          </div>
          <Link
            href="#"
            className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white bg-[#ff385c] hover:bg-[#A31D1D] transition duration-150"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
