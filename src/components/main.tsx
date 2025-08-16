import Card from "./card"

export interface activityProps{
    address:string
    categoryId:string
    city:string
    id:string
    description:string
    facilities:string
    imageUrls: string
    price:number
    price_discount:number
    province:string
    title:string
    rating:number
    total_reviews:number
    location_maps:string
}

const Main = async () => {

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const TOKEN = process.env.NEXT_PUBLIC_TOKEN


    const res = await fetch(`${BASE_URL}/api/v1/activities`, {
    method:"GET",
    cache:"no-store",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'apiKey':"24405e01-fbc1-45a5-9f5a-be13afcd757c"
  },
});
const data = await res.json()

    console.log(data)
    console.log("BASE_URL:", BASE_URL);
    console.log("Token:", TOKEN);

  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
        <div className="grid gap-7 md:grid-cols-3 grid-rows-5">

            {data.data.map((item:activityProps) => (
            <Card key={item.id} title={item.title} imageUrls={item.imageUrls[0]} />

        ))}
        </div>


    </div>
  )
}

export default Main