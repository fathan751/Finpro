import Image from "next/image"

interface Title{
    title:string
    subTitle:string
}

const Headersection = ({title,subTitle}:Title) => {
  return (
    <header className="relative h-60 text-white overflow-hidden">
        <div className="absolute inset-0">
            <img src="/images/hero.jpg" alt="Header Image" className="object-cover object-center w-full h-full"/>
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative flex flex-col justify-center items-center h-60 text-center">
            <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
            <p className="text-xl text-gray-300">{subTitle}</p>
        </div>
    </header>
  )
}

export default Headersection