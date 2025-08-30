import axios from "axios";
import { BASE_URL,API_KEY } from "@/components/main";
import { CategoryProps } from "@/types/category";

export const fetchCategory = async (): Promise<CategoryProps[]> => {
    const response = await axios.get(`${BASE_URL}/api/v1/categories`,{
        headers:{
            apiKey: API_KEY
        }
    })

    return response.data.data
}

