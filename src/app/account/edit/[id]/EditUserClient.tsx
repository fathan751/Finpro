"use client"

import axios from "axios"
import { BASE_URL } from "@/components/main"
import React, { useEffect, useState } from "react"
import { UserProps } from "@/types/user"
import { API_KEY } from "@/components/main"
import Cookies from "js-cookie"
import { IoCloudUploadOutline } from "react-icons/io5"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const EditUserClient = ({userId}:{userId:string}) => {

  const token = Cookies.get("token")
  const router = useRouter()
  const loginRole = Cookies.get("role")

  const [users,setUsers] = useState<UserProps|null>(null)
  const [file,setFile] = useState<File|null>(null)
  const [previewImg,setPreviewImg] = useState<string|null>(null)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phoneNumber,setPhoneNumber] = useState<string>("")
  const [role,setRole] = useState("")

    const fetchUser = async () => {
      try {
        const resUser = await axios.get(`${BASE_URL}/api/v1/user`,{
          headers:{
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`
          }
    })
    console.log(resUser)
    setUsers(resUser.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }
    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    }
    const handlePhoneNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(e.target.value)
    }


    useEffect(()=> {
      fetchUser()

    },[])
    
    useEffect(() => {
      if(users){
        setName(users.name)
        setEmail(users.email)
        setPhoneNumber(users.phoneNumber.toString())
        setRole(users.role)
      }
    },[users])

    const handleUploadImage = (e:React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if(selectedFile){
        setFile(selectedFile)
        setPreviewImg(URL.createObjectURL(selectedFile))

      }
    }
    const handleDeleteImage = () => {
      setPreviewImg(null)
      setFile(null)
    }
    
    const handleRole = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setRole(e.target.value)
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if(!file && !previewImg){
        toast.error("No FIle Detected")
        return
      }

      try {
          let userPicture = previewImg
          if(file){
            const imageForm = new FormData()
            imageForm.append("image",file)

            const imageRes = await axios.post(`${BASE_URL}/api/v1/upload-image`, imageForm,{
              headers: {
                "Content-Type": "multipart/form-data",
                "apiKey": API_KEY
              }
            })

            userPicture = imageRes.data.url
          }

          const rolePayload = {
            role: role
          }

          const payload ={
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            profilePictureUrl: userPicture
          }

          const resEditUser = await axios.post(`${BASE_URL}/api/v1/update-profile`,payload,{
            headers:{
              Authorization: `Bearer ${token}`,
              apiKey: API_KEY
            }
          })

          const resEditRole = await axios.post(`${BASE_URL}/api/v1/update-user-role/${userId}`,rolePayload,{
            headers:{
              Authorization: `Bearer ${token}`,
              apiKey: API_KEY
            }
          })

          console.log(resEditUser)
          console.log(resEditRole)
          toast.success(resEditUser.data.message)
          toast.success(resEditRole.data.message)
          setTimeout(() => {
            router.replace("../")
          },2000)
          
      } catch (error) {
        console.log(error)
      }
      

    }
      
  return (
    <div className='bg-white max-h-screen mt-10 pb-10'>
        <div className='h-[100px] rounded-t-xl bg-gradient-to-r from-[#ff385c] to-[#a31d1d]'></div>
        <div className="mt-7 px-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="font-semibold">Name </label>
              <input autoComplete="on" value={name} onChange={handleName} type="text" name="name" id="name" className="border px-2 border-gray-400 w-fit block" placeholder="name..."/>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="font-semibold">Email </label>
              <input autoComplete="email" value={email} onChange={handleEmail} type="text" name="email" id="email" className="border px-2 border-gray-400 w-fit block" placeholder="email..."/>
            </div>

            <div className="mb-4">
              <label htmlFor="Phone-Number"  className="font-semibold">Phone Number </label>
              <input autoComplete="on" value={phoneNumber??""} onChange={handlePhoneNumber} type="text" name="Phone-Number" id="Phone-Number" className="border px-2 border-gray-400 w-fit block" placeholder="Phone Number..."/>
            </div>
            
            {loginRole === "admin" &&
            <div className="mb-4">
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <select name="role" id="role" onChange={handleRole} className="border-gray-400 border px-2 py-1 font-semibold">
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            </div>
            }

            <div className="bg-white p-4">
              
              {previewImg && 
                <div className="flex justify-start mb-1">
                    <button onClick={handleDeleteImage} className="bg-[#ff385c] pb-1 px-2 rounded-md text-white font-medium cursor-pointer">x</button>
                </div>
              }

              <label className="flex flex-col mb-4 items-center justify-center aspect-video max-w-md w-full border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative">
                
  {previewImg ? (
    <div className="w-full h-full relative">
      <img src={previewImg} alt="Preview" className="w-full h-full object-contain rounded border overflow-hidden"/>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
      <div className="flex flex-col items-center justify-center">
        <IoCloudUploadOutline aria-hidden="true" className="size-8 pointer-events-none" />
        <p className="mb-1 text-sm font-bold">Select Image</p>
        <p className="text-xs">SVG, PNG, JPG, GIF, or Others (max: 1MB)</p>
      </div>
    </div>
  )}
  <input type="file" name="file" id="input-file" className="hidden" accept="image/*" onChange={handleUploadImage}/>
</label>

                <button type="submit" className="bg-[#ff385c] text-white w-full hover:bg-[#a31d1d] py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">Update</button>


              
            </div>

          </form>

        </div>

        
    </div>
  )
}

export default EditUserClient