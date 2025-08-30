import axios from "axios";
import { BASE_URL,API_KEY } from "@/components/main";
import { ActivityProps } from "@/types/activity";


export const fetchActivity = async (): Promise<ActivityProps[]> => {
    const response = await axios.get(`${BASE_URL}/api/v1/activities`,{
        headers:{
            apiKey: API_KEY
        }
    })
    return response.data.data
}

export const getActivityDetailById = async (id:string) :Promise<ActivityProps> => {
    const response = await axios.get(`${BASE_URL}/api/v1/activity/${id}`,{
        headers:{
            apiKey: API_KEY
        }
    })

    return response.data.data
}