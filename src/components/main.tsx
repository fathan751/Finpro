import Card from "./card"
import { ActivityProps } from "@/types/activity"

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const Main = async () => {


    const res = await fetch(`${BASE_URL}/api/v1/activities`, {
    method:"GET",
    cache:"no-store",
  headers: {
    'apiKey': API_KEY ?? ""
  },
});
const data = await res.json()

  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4
     mx-auto">
        <div className="grid gap-7 md:grid-cols-3">
            {data.data.slice(0,9).map((item:ActivityProps) => (
            <Card key={item.id} activityId={item.id} title={item.title} imageUrls={item.imageUrls[0]} price={item.price} totalReview={item.total_reviews} rating={item.rating} />
        ))}
        </div>

    </div>
  )
}

export default Main