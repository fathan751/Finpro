"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { IoTrashOutline, IoHeartOutline } from "react-icons/io5"
import { CartProps } from "@/types/cart"
import axios from "axios"
import Cookies from "js-cookie"
import { BASE_URL,API_KEY } from "../main"
import { ActivityProps } from "@/types/activity"
import { Button } from "../ui/button"

const CartForm = () => {

  const token = Cookies.get("token")
  const [quantity, setQuantity] = useState<string|null>("")

  const [carts,setCarts] = useState<CartProps[]>([])

  const updateCartQuantity = async (cartId: string, newQuantity: number) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/update-cart/${cartId}`,{quantity: newQuantity},{
          headers:{
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`
          }
        })

        setCarts(prev => prev.map(cart => cart.id === cartId? {...cart, quantity: newQuantity}: cart))
        console.log("update sukses",res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCart = async (cartId: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/v1/delete-cart/${cartId}`,{
        headers:{
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`
        }
      })
      console.log(`Delete Cart Succes`,res.data)
    } catch (error) {
      console.log(error)
    }
  }


  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/carts`,{
        headers:{
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      setCarts(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCart()

  },[])


  return (
    <form action="">
      <div className="grid md:grid-cols-12 gap-5">
        {/* LEFT: Produk */}
        <div className="col-span-8 bg-white p-4 rounded-lg shadow-sm">
          {/* Header Pilih Semua */}
          <div className="flex items-center justify-between bg-blue-100 p-2 rounded-md mb-4">
            <label className="flex items-center gap-2">
              <span className="font-medium">Pilih Semua ({carts.length})</span>
            </label>
          </div>

          {/* Item */}
          {carts.map(cart => (

          <div key={cart.activityId} className="border p-4 rounded-md flex gap-4 items-start mb-2">
            <input type="checkbox" defaultChecked className="mt-2" />

            <Image
              src={cart.activity.imageUrls[0]}
              alt="Buku"
              width={70}
              height={70}
              className="rounded border"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">
                {cart.activity.title}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-2 ">
                ({cart.activity.description})
              </p>
              <p className="text-lg font-semibold mt-2">
                {/* Rp{price.toLocaleString("id-ID")} */}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    const newQty = Math.max(1,cart.quantity - 1)
                    updateCartQuantity(cart.id,newQty)}}
                  className="px-2 py-1 border rounded"
                  disabled={cart.quantity <= 1}
                >
                  −
                </button>
                <span>{cart.quantity}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newQty = cart.quantity + 1
                    updateCartQuantity(cart.id,newQty)}}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center text-gray-500">
              <Button onClick={() => deleteCart(cart.id)} className="bg-white text-black hover:bg-[#ff385c] cursor-pointer">
                <IoTrashOutline size={20} className="cursor-pointer" />
              </Button>
            </div>
          </div>
          ))
          }

        </div>
        

        {/* RIGHT: Ringkasan */}
        <div className="col-span-4 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Ringkasan belanja</h3>
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-semibold text-gray-800">
              {/* Rp{total.toLocaleString("id-ID")} */}
            </span>
          </div>

          <div className="bg-green-50 border border-green-300 rounded-md p-3 mb-4 text-sm text-green-700">
            ✅ 1 kupon promo berhasil dipakai
            <br />
            <span className="text-gray-600">
              {/* Dapat cashback Rp{cashback.toLocaleString("id-ID")} */}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition"
            // onClick={}
          >
            Beli ({carts.length})
          </button>
        </div>
      </div>
    </form>
  )
}

export default CartForm
