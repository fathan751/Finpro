import axios from "axios"
import { BASE_URL,API_KEY } from "@/components/main"
import { BannerProps } from "@/types/banner"

export const fetchBanner = async () :Promise<BannerProps[]> => {
    const response = await axios.get(`${BASE_URL}/api/v1/banners`,{
        headers:{
            apiKey:API_KEY
        }
    })

    return response.data.data
}