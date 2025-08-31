"use client"

import React, { useEffect, useRef, useState } from "react"
import CardNoStar from "./cardNoStart"
import { PromoProps } from "@/types/promo"
import { getPromo } from "@/services/promoService"
import Image from "next/image"


const Promo = () => {
  const scrollRef = useRef<HTMLDivElement>(null)  
  const [promos, setPromos] = useState<PromoProps[]>([])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const load = async () => {
        try {
            const data = await getPromo()
            setPromos(data)
        } catch (error) {
            console.log(error)
        }
    }
    load()
  },[])

  return (
    <div className="max-w-screen-xl h-auto mx-auto">
      {/* Discover Restaurants */}
      <section
        id="discover-container"
        className=" pt-[42px] min-h-[411.391px] lg:min-h-[527.594px] m-[0px] box-content"
      >
        <h1 className="text-[#10024A] font-bold text-[24px] lg:text-[36px] mb-[4px]">
          Special Offer Promo <Image src={"/images/discount.png"} className="inline" alt="Promo Icon" width={30} height={30}/>
        </h1>
        
        <div className="flex gap-[7px] justify-between">
            <div className="flex gap-2">
            <p className="text-[12px] lg:text-[16px] font-normal text-[#6c6f95] pb-[20px]">
                Get Your Promo Right Here Right Now
            </p>
            </div>
          

          <div className=" hidden lg:block">
          <button
            onClick={scrollLeft}
            className="text-2xl font-bold text-gray-700 hover:text-black"
          >
            {"<"}
          </button>
          <button
            onClick={scrollRight}
            className="text-2xl font-bold text-gray-700 hover:text-black ml-[10px]"
          >
            {">"}
          </button>
        </div>
        </div>

        {/* scrollable container */}
        <div
          ref={scrollRef}
          className="h-[281px] lg:h-auto flex overflow-x-scroll w-full"
        >
          {promos.map((item) => (
            <CardNoStar
              key={`disc-${item.id}`}
              image={item.imageUrl}
              title={item.title}
              context={item.description}
              promoId={item.id}
            />
          ))}
        </div>

        {/* Mobile see more button */}
        <div className="flex items-center justify-center min-w-[390px] min-h-[40px] border rounded-full mt-[12px] mr-[24px] lg:hidden">
          <h1 className="font-bold">See more</h1>
        </div>
      </section>
    </div>
  )
}

export default Promo
