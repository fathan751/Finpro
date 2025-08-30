"use client"

import {IoClose} from "react-icons/io5"
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Dispatch,SetStateAction } from "react";
import Cookies from "js-cookie";

interface LoginModalProps{
    onClose: () => void 
    isRegister:boolean
    setIsRegister: Dispatch<SetStateAction<boolean>>
}

const LoginModal = ({onClose,isRegister,setIsRegister }:LoginModalProps) => {

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loading,setLoading] = useState(false)

    const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setEmailError(false)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setPasswordError(false)
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        let hasError = false

        if(!email.trim()){
            setEmailError(true)
            hasError = true
        }

        if(!password.trim()){
            setPasswordError(true)
            hasError = true
        }

        if(hasError){
            toast.error("Email dan Password tidak boleh koosng")
            return
        }

        const payload = {
            email:email,
            password:password
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/v1/login`,payload,{
                headers:{
                    'apiKey': "24405e01-fbc1-45a5-9f5a-be13afcd757c"
                }
            })
            console.log(res)
            const token = res.data.token
            Cookies.set("token",token)
            Cookies.set("role",res.data.data.role)
            window.dispatchEvent(new Event("storageUpdate"))
            toast.success('Login Berhasil')
            setLoading(false)
            setTimeout(() => {
                window.location.reload()
            },1000)

        } catch (err:any) {
            console.log(err)
            toast.error(err.response?.data?.message || "ID Password Salah")
            setLoading(false)
        }
    }

  return (
    <div className="fixed inset-0 bg-black/20  flex items-center justify-center">
      <div className="bg-white border border-2xl p-6 rounded-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-xl inline"
        >
          <IoClose className="size-7 hover:size-8 hover:cursor-pointer"/>
        </button>
        <h1 className="text-center font-bold text-2xl mb-2">Travelins</h1>
        <h2 className="text-xl font-semibold mb-4">Login Your Account</h2>
        <form onSubmit={handleLogin}>
            <input onChange={changeUsername} autoComplete="email" type="email" placeholder="Email" className={`border p-2 w-full ${emailError?"border-red-500":"border-gray-300"}`} />
            {emailError && <p className="text-red-500 text-sm mt-1">Email is Required*</p>}
            <input onChange={changePassword} autoComplete="current-password" type="password" placeholder="Password" className={`border p-2 w-full mt-2 ${passwordError?"border-red-500":"border-gray-300"}`} />
            {passwordError && <p className="text-sm text-red-500">Password is Required*</p>}
            <div className={`flex justify-between mb-2`}>
                <span>
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember" className="ml-2">Remember me</label>
                </span>

                <p>
                    <Link href="/forgot-password">
                        Forgot Password?
                    </Link>
                </p>
            </div>


            <button type="submit" className={`${loading? "opacity-50 cursor-not-allowed":"bg-[#ff385c] text-white px-4 py-2 rounded w-full"}`} disabled={loading}>Login</button>
        </form>
        
        <div className=" flex justify-center gap-1 mt-3">
            <p>Don't have account?</p> 
            <button onClick={():void => setIsRegister(!isRegister)} disabled={loading}><span className={`font-bold`}>Register</span></button>
        </div>

      </div>
    </div>

  );
}


export default LoginModal