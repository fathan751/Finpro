import { BASE_URL,API_KEY } from "@/lib/constant";
import axios from "axios";

export const getTuvalu = async () => {
    
    const res = await axios.get(`${BASE_URL}/api/v1/activities-by-category/6afafacc-c5b4-4553-9323-925cb8bf76eb`,{
        headers:{
            apiKey: API_KEY
        }
    })

    return res.data.data
}