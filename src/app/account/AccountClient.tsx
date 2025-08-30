"use client"

import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { UserProps } from "@/types/user"
import axios from "axios"
import { BASE_URL,API_KEY } from "@/components/main"
import AccountForm from "@/components/account/account-form"


const AccountClient = () => {

    const token = Cookies.get("token")
    const [user,setUser] = useState<UserProps|null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUser = async () => {
        
        try {
            const resUser = await axios.get(`${BASE_URL}/api/v1/user`,{
                headers:{
                    "apiKey" : API_KEY,
                    "Authorization" : `Bearer ${token}`
                }
            })
            console.log(resUser)
            setUser(resUser.data.data)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    } 

    useEffect(() => {
        if(token){
            fetchUser()
        }else{
            setLoading(false)
            setError("Belum Loin")
        }
    },[])

    if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
        <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        <AccountForm user={user}/>
    </div>
  )
}

export default AccountClient