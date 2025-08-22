import Image from "next/image"
import Link from "next/link"

interface Banner {
  id: string
  imageUrl: string
}

const Hero = async () => {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const res = await fetch(`${BASE_URL}/api/v1/banners`,{
    method:"get",
    cache:"no-store",
    headers: {
      'apiKey':"24405e01-fbc1-45a5-9f5a-be13afcd757c"
    }
  })

  const data = await res.json()

  return (
    <div className="relative h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
            <Image src={data.data[3].imageUrl} alt="hero image" fill className="object-cover object-center w-full h-full"/>
            <div className="absolute inset-0 bg-black opacity-50 "></div>
        </div>
        <div className="relative flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize">Book Your Travel</h1>
            <p className="text-xl text-gray-300 mb-8">Get Special offer just for you today</p>
            <div className="flex gap-5">
                <Link href="/activity" className="bg-[#A31D1D] hover:bg-red-400 py-2.5 px-6 md:px-10 text-lg font-semibold hover:scale-110 hover:shadow-lg">Book Now</Link>

                <Link href="/contact" className="bg-transparent border border-[#a31d1d] hover:bg-red-600 py-2.5 px-6 md:px-10 text-lg font-semibold hover:scale-110 hover:shadow-lg">Contact Us</Link>
            </div>
        </div>
    </div>
  )
}

export default Hero