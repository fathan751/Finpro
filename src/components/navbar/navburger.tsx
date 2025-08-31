'use client'

import Link from "next/link"
import {IoClose,IoMenu,IoPeople} from "react-icons/io5"
import { useEffect, useState } from "react"
import NavCart from "./_components/navCart"
import LoginModal from "./_components/loginmodal"
import Registermodal from "./_components/registermodal"
import Cookies from "js-cookie"

export const tokenUser = Cookies.get("token")


const Navburger = () => {


    const [token,setToken] = useState<string|null>(null)
    const [open,setOpen] = useState(false)
    const [openLogin, setOpenLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false)
    const role = Cookies.get("role")


    const handleLogout = () => {
        Cookies.remove("token")
        Cookies.remove("role")
        setToken(null)
        window.location.href="/"
    }

    useEffect(()=>{
        const updateToken = () => {
        const storedToken = Cookies.get("token")
        setToken(storedToken !== undefined?storedToken:null)
        }

        updateToken()
        
        window.addEventListener("storageUpdate", updateToken);
        window.addEventListener("storage",updateToken)

        return () => {
            window.removeEventListener("storageUpdate",updateToken)
            window.removeEventListener("storage",updateToken)
        }
    },[])



  return (
    <div className="flex gap-5 items-center">
        <button onClick={() => setOpenLogin(!openLogin)} className={token?"hidden":"md:block hidden self-center bg-[#ff385c] hover:bg-red-300 px-5 py-2 rounded-sm text-[#f8f2de]"}>Login</button>
        <button onClick={handleLogout} className={token?"md:block hidden self-center bg-[#ff385c] hover:bg-red-300 px-5 py-2 rounded-sm text-[#f8f2de]":"hidden"}>Logout</button>
        
      {openLogin && (!isRegister?<LoginModal isRegister={isRegister} setIsRegister={setIsRegister} onClose={() => setOpenLogin(!openLogin)}/>:<Registermodal onClose = {() => setOpenLogin(!openLogin)} isRegister={isRegister}
        setIsRegister={setIsRegister}/>)}
        <NavCart/>
        <button onClick={() => setOpen(!open)} className="  p-2  text-sm text-gray-500 rounded-md hover:bg-gray-100">
            {!open? <IoMenu className="size-8"/> : <IoClose className="size-8"/>}
        </button>

        <div className={open?`fixed top-20 lg:top-22 right-0  2xl:right-5  rounded-xl  bg-[#efefef] w-[200px] h-screen lg:h-2/3  lg:w-[250px]`:"hidden"}>
          <ul className="p-4 flex flex-col gap-4">
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/'}>
                    Home
                </Link>
            </li>
            {token &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/account'} className="flex items-center gap-3">
                  <IoPeople />Account
                </Link>
            </li>
            }
            {(token && role==='admin') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/admin/dashboard'}>
                   Dashboard
                </Link>
            </li>
            }
            {(token && role==='admin') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/admin/activity'}>
                   Manage Activity
                </Link>
            </li>
            }
            {(token && role==='admin') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/admin/category'}>
                   Manage Category
                </Link>
            </li>
            }
            {(token && role==='admin') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/admin/banner'}>
                   Manage Banners
                </Link>
            </li>
            }
            {(token && role==='admin') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/admin/promo'}>
                   Manage Promo's
                </Link>
            </li>
            }
            {(token && role==='admin') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/admin/transaction'}>
                   Manage Transaction
                </Link>
            </li>
            }

            {(token && role==='user') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/my-transaction'}>
                   My Transaction
                </Link>
            </li>
            }
            {(token && role==='user') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/contact'}>
                    Contact Us
                </Link>
            </li>
            }
            {(token && role==='user') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={"/cart"} className="inline">My Cart</Link>
            </li>
            }
{(token && role==='user') &&
            <li className="hover:bg-gray-200 py-2">
                <Link href={'/about'}>
                    About Us
                </Link>
            </li>
}
            <li>
            <button onClick={handleLogout} className={token?" py-2 w-full text-left cursor-pointer hover:bg-gray-200":"hidden"}>Logout</button>
            <button onClick={() => setOpenLogin(!openLogin)} className={token?"hidden":"md:block hidden cursor-pointer w-full text-left py-2  hover:bg-gray-200"}>Login</button>
            </li>

          </ul>
        </div>
    </div>
  )
}

export default Navburger