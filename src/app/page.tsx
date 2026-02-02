import Hero from "@/components/hero";
import Main from "@/components/main";
import Promo from "@/components/promo";

const Home = async () => {
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
    <div>
      <Hero/>
      <div>
          <Promo/>
          <img src={data.data[1]?.imageUrl??"/images/brokenimg.png"} className="object-cover max-w-screen-xl object-center my-5 rounded-md w-full h-30 mx-auto"/>
          <Main/>
      </div>
    </div>
  );
}

export default Home