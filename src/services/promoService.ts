import axios from "axios"
import { BASE_URL,API_KEY } from "@/components/main"


export const getPromo = async () => {

    const response = await axios.get(`${BASE_URL}/api/v1/promos`,{
        headers:{
            apiKey: API_KEY
        }
    })

    return response.data.data
}

  
export const getPromoById = async (promoId:string) => {
    const response = await axios.get(`${BASE_URL}/api/v1/promo/${promoId}`,{
        headers:{
            apiKey: API_KEY
        }
    })

    return response.data.data
}