"use client"
import Link from "next/link"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import NavAdmin from "./_components/navadmin"
import NavUser from "./_components/navuser"



const Navlink = () => {

    const [role,setRole] = useState<string|null>(null)

    useEffect(() => {
        const storedRole = Cookies.get("role")
        setRole(storedRole||null)
    },[])

   
    return(
        <>
            {role === "admin"? <NavAdmin/>:<NavUser/>}
        </>
    )
}

export default Navlink