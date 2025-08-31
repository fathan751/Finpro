import { BASE_URL,API_KEY } from "@/components/main"
import axios from "axios"

export const getAllTransaction = async(token:string) => {
    const response = await axios.get(`${BASE_URL}/api/v1/all-transactions`,{
        headers:{
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`
        }
    })

    return response.data.data
}

export const getMyTransaction = async(token:string) => {
    const response = await axios.get(`${BASE_URL}/api/v1/my-transactions`,{
        headers:{
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data
}
