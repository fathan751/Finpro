import Link from "next/link"

interface CardNoStar {
    image: string
    title: string
    context: string
    promoId: string
}

const CardNoStar = ({image,title,context,promoId}:CardNoStar) => {


    return(
        <Link href={`/promo/${promoId}`}>
            <div className="item w-[224px] min-h-[257px] lg:w-[412px] lg:h-auto mr-[24px] ">
                <img src={image||"images/replace.png"} alt="promo image" className="min-w-[224px] lg:min-w-[412px] h-[168px] lg:h-[308px] rounded-md object-cover cursor-pointer"
                onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null; 
                    target.src = "images/replace.png";
                }}/>
                <h1 className="w-auto h-auto font-bold pt-[8px] lg:text-[24px]">{title}</h1>
                <p className="text-[12px] font-normal text-[#6c6f95] mt-[5px] lg:text-[16px] line-clamp-2">{context}</p>
            </div>
        </Link>
    )
}

export default CardNoStar