"use client"

import React, { useState } from "react"
import {IoClose} from "react-icons/io5"
import { Dispatch,SetStateAction } from "react";
import { toast } from "sonner";
import axios from "axios";


interface RegistermodalProps{
    onClose : () => void 
    isRegister : boolean
    setIsRegister : Dispatch<SetStateAction<boolean>>
}


const Registermodal = ({onClose,setIsRegister, isRegister}: RegistermodalProps) => {

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY

    const [file,setFile] = useState<File|null>(null)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passwordRepeat,setPasswordRepeat] = useState("")
    const [role,setRole] = useState("user")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [preview, setPreview] = useState<string | null>(null)
    
    const [fileError,setFileError] = useState(false)
    const [nameError,setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordRepeatError,setPasswordRepeatError] = useState(false)
    const [passMatchError,setPassMatchError] = useState(false)
    const [phoneNumberError,setPhoneNumberError] = useState(false)

    const [loading,setLoading] = useState(false)

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setNameError(false)
    }

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setEmailError(false)
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setPasswordError(false)
    }

    const handleConfirmPass = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRepeat(e.target.value)
        setPassMatchError(false)
        setPasswordRepeatError(false)
    }

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if(selectedFile){
            setFile(selectedFile)
            setPreview(URL.createObjectURL(selectedFile))
            setFileError(false)
        }
    }

    const handleRoleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value)
    }

    const handlePhoneNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value)
        setPhoneNumberError(false)
    }

    const handleDeleteImage = () => {
        setPreview(null)
        setFile(null)
    }

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        let hasError;

        if(!email.trim()){
            setEmailError(true)
            hasError = true
        }

        if(!password.trim()){
            setPasswordError(true)
            hasError = true
        }

        if(!passwordRepeat.trim()){
            setPasswordRepeatError(true)
            hasError = true
        }

        if(!name.trim()){
            setNameError(true)
            hasError = true
        }
        if(!phoneNumber.trim()){
            setPhoneNumberError(true)
            hasError = true
        }

        if(password !== passwordRepeat){
            setPassMatchError(true)
            hasError = true
            toast.error("Password dan konfirmasi tidak cocok")
            return
        }else{
            setPassMatchError(false)
        }

        if (!file) {
        toast.error("Please upload a profile picture.")
        setFileError(true)
        return
}


        try {

            const imageForm = new FormData()
            imageForm.append("image",file)

            const imageRes = await axios.post(`${BASE_URL}/api/v1/upload-image`,imageForm,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "apiKey": API_KEY
                }
            })
            const profilePictureUrl = imageRes.data.url
            console.log("Image uploaded to:",profilePictureUrl)

        const payload = {
            name: name,
            email: email,
            password: password,
            passwordRepeat: passwordRepeat,
            role: role,
            profilePictureUrl: profilePictureUrl,
            phoneNumber: phoneNumber
        }

            const registerRes = await axios.post(`${BASE_URL}/api/v1/register`,payload,{
                headers:{
                    "Content-Type" : "application/json",
                    "apiKey": API_KEY 
                }
            })
            console.log(registerRes)
            toast.success(registerRes.data.message)
            setLoading(false)

            setTimeout(() => {
                window.location.reload()
            },1000)

            
        } catch (err:any) {
            console.log(err)
            toast.error(err.response?.data?.message|| "Error")
            setLoading(false)
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
        <h2 className="text-xl font-semibold mb-4">Register Your Account</h2>
        <form onSubmit={handleRegister}>
            {nameError && <p className="text-red-500 text-sm mb-2">Name is required*</p>}
            <input onChange={handleName} placeholder="Name" type="name" className="border p-2 w-full mb-2"/>
            {emailError && <p className="text-red-500 text-sm mb-2">Email is required*</p>}
            <input onChange={handleEmail} autoComplete="email" type="email" placeholder="Email" className="border p-2 w-full mb-2" />
            {passwordError && <p className="text-red-500 text-sm mb-2">Password is Required*</p>}
            <input onChange={handlePassword} autoComplete="current-password" type="password" placeholder="Password" className="border p-2 w-full mb-2 " />
            {passwordRepeatError && <p className="text-sm text-red-500">Repeat Password is Required*</p>}
            {passMatchError && <p className="text-red-500 text-sm mb-2">Password isn't Match*</p>}
            <input onChange={handleConfirmPass} autoComplete="current-password" type="password" placeholder="Repeat Password" className="border p-2 w-full mb-2" />

            <div className="mb-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
                <select id="role" value={role} onChange={handleRoleChange} className="border border-gray-400">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {phoneNumberError && <p className="text-red-500 text-sm mb-2">Phone Number is Required*</p>}
            <input onChange={handlePhoneNumber} placeholder="Phone Number" className="border p-2 w-full mb-2"/>

            <div className="mb-2">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Profile Picture
            </label>
            <div className="flex items-center gap-2">
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block bg-[#ff385c] text-white px-4 py-2 rounded hover:bg-red-400 transition"
              >
                Select Picture
              </label>
              {file && <span className="text-sm text-gray-600">{file.name}</span>}
            </div>
            <input
              id="file-upload"
              name="file"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            {preview && (
                <div className="flex gap-2 relative">
                  <img src={preview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded border" />
                    <button type="button" onClick={handleDeleteImage} className="text-white w-2 h-4 flex items-center justify-center hover:cursor-pointer  bg-red-500 p-3 mt-2">x</button>
                </div>
                )}
                
          </div>
          {fileError && <p className="text-red-500 text-sm">Please Enter File</p>}

            <button type="submit" className="bg-[#ff385c] text-white px-4 py-2 rounded w-full hover:cursor-pointer">Register</button>
        </form>
        
        <div className=" flex justify-center gap-1 mt-3">
            <p>Already Have Account?</p> 
            <button onClick={():void => setIsRegister(!isRegister)}><span className="font-bold hover:cursor-pointer ">Login</span></button>
        </div>
    </div>
    </div>
  )
}

export default Registermodal