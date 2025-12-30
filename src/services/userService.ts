import { BASE_URL,API_KEY } from "@/lib/constant"

export const getUser = async (token:string) => {
    const res = await fetch(`${BASE_URL}/api/v1/user`,{
        method:"get",
        cache:"no-store",
        headers:{
            apiKey: `${API_KEY}`,
            Authorization: `Bearer ${token}`
            
        }
    })

    if(!res.ok){
        throw new Error(`Failed to fetch user`)
    }

    const data = await res.json()

    return data
}