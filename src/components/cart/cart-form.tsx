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
import { PaymentMethod } from "@/types/payment"
import { toast } from "sonner"

const CartForm = () => {

  const token = Cookies.get("token")
  const [paymentMethods,setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedPayment,setSelectedPayment] = useState<string | null>(null)
  const [carts,setCarts] = useState<CartProps[]>([])

  // API Cart
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

  // API PAYMENT METHODS ===

  const getPaymentMethods = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/payment-methods`,{
        headers:{
          apiKey: API_KEY
        }
      })
      console.log(res)
      setPaymentMethods(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCart()
    getPaymentMethods()
  },[])


  // API Create Transaction ===

  const createTransaction = async () => {

    try {
      const cartIds = carts.map(c => c.id)
      const res = await axios.post(`${BASE_URL}/api/v1/create-transaction`,{cartIds,paymentMethodId: selectedPayment},{
        headers:{
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      toast.success(res.data.message)
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

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

            <img
              src={cart.activity.imageUrls[0]}
              alt="Buku"
              width={70}
              height={70}
              className="rounded border w-[70px] h-[70px]"
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
            Kupon
            <br />
            <span className="text-gray-600">
              {/* Dapat cashback Rp{cashback.toLocaleString("id-ID")} */}
            </span>
          </div>
          {/* select payment method */}
           <div className="mb-4">
            <h4 className="font-medium mb-2">Pilih Metode Pembayaran</h4>
            <div className="space-y-2">
              {paymentMethods.map(pm => (
                <label
                  key={pm.id}
                  className={`flex items-center gap-3 p-2 border rounded cursor-pointer ${
                    selectedPayment === pm.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={pm.id}
                    checked={selectedPayment === pm.id}
                    onChange={() => setSelectedPayment(pm.id)}
                  />
                  <img
                    src={pm.imageUrl}
                    alt={pm.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <span>{pm.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="button" onClick={createTransaction} disabled={!selectedPayment || carts.length === 0} 
          className={`w-full text-white font-medium py-3 rounded-lg transition ${!selectedPayment || carts.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff385c] hover:bg-red-700"}`}> Beli ({carts.length})</button>
        </div>
      </div>
    </form>
  )
}

export default CartForm
