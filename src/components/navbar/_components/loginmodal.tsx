"use client"

import {IoClose} from "react-icons/io5"
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface LoginModalProps{
    onClose: () => void
}

const LoginModal = ({onClose }:LoginModalProps) => {

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL



    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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
            localStorage.setItem("token",token)
            window.dispatchEvent(new Event("storageUpdate"))
            toast.success('Login Berhasil')
            setTimeout(() => {
                onClose()
            },1000)

        } catch (err:any) {
            console.log(err)
            toast.error(err.response?.data?.message || "ID Password Salah")
        }
    }

  return (
    <div className="fixed inset-0 bg-black/20  flex items-center justify-center">
      <div className="bg-white border border-2xl p-6 rounded-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-xl"
        >
          <IoClose className="size-7 hover:size-8 hover:cursor-pointer"/>
        </button>
        <h2 className="text-xl font-semibold mb-4">Login Your Account</h2>
        <form onSubmit={handleLogin}>
            <input onChange={changeUsername} autoComplete="email" type="email" placeholder="Email" className="border p-2 w-full mb-2" />
            <input onChange={changePassword} autoComplete="current-password" type="password" placeholder="Password" className="border p-2 w-full " />
            <div className="flex justify-between mb-2">
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


            <button type="submit" className="bg-[#ff385c] text-white px-4 py-2 rounded w-full">Login</button>
        </form>
        
        <div className=" flex justify-center gap-1 mt-3">
            <p>Don't have account?</p> 
            <Link href='/register' rel="preload"><span className="font-bold ">Register</span></Link>
        </div>

        <h1 className="text-lg font-[poppins] text-black text-center my-3">- Or -</h1>

        <div className="border-1 rounded-xl w-fit h-[2em] justify-self-center border-[#7C838A] flex items-center px-2">
            <Image src="/images/Google.png" width={20} height={20} alt="google"/>
            <p>Sign up with google</p>
        </div>
      </div>
    </div>
  );
}


export default LoginModal