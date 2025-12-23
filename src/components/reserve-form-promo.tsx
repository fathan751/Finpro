"use client"
import { useState } from "react";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker"
import axios from "axios";
import { BASE_URL,API_KEY } from "./main";
import Cookies from "js-cookie";
import { toast } from "sonner";
import LoginModal from "./navbar/_components/loginmodal";
import Registermodal from "./navbar/_components/registermodal";

const ReserveFormPromo = ({promoId}:{promoId:string}) => {

    const token = Cookies.get("token")

    const StartDate = new Date()
    const EndDate = addDays(StartDate,1)

    const [startDate,setStartDate] = useState(StartDate)
    const [endDate,setEndDate] = useState(EndDate)
    const [openLogin, setOpenLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false)

    const handleDateChange = (dates: any) => {
        const [start,end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const handleAddToCart = async () => {

        const payload = {
            activityId: promoId
        }
        try {
            const resCart = await axios.post(`${BASE_URL}/api/v1/add-cart`,payload,{
                headers:{
                    apiKey: API_KEY,
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(resCart)
            toast.success(resCart.data.message)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Arrival - Departure</label>
            </div>
            <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                onChange={handleDateChange}
                selectsRange={true}
                dateFormat={"dd-MM-YYYY"}
                wrapperClassName="w-full"
                className="py-2 px-4 rounded-md mb-4 border border-gray-300 w-full"
            />
            

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                <input type="text" name="name" className="py-2 px-4 rounded-md border border-gray-300 w-full" placeholder="Full Name..."/>
            </div>
           

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                <input type="text" name="phone" className="py-2 px-4 rounded-md border border-gray-300 w-full" placeholder="Phone Number..."/>
            </div>
            
            {token ? (
        <button
          onClick={handleAddToCart}
          className="px-10 py-3 text-center font-semibold text-white w-full bg-[#ff385c] rounded-sm cursor-pointer hover:bg-[#aa1d1d]"
        >
          Add To Cart
        </button>
      ) : (
        <>
          {openLogin && (
            !isRegister ? (
              <LoginModal
                isRegister={isRegister}
                setIsRegister={setIsRegister}
                onClose={() => setOpenLogin(false)}
              />
            ) : (
              <Registermodal
                isRegister={isRegister}
                setIsRegister={setIsRegister}
                onClose={() => setOpenLogin(false)}
              />
            )
          )}

          <button
            onClick={() => setOpenLogin(true)}
            className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white w-full bg-[#ff385c] hover:bg-[#A31D1D] transition duration-150"
          >
            Add To Cart
          </button>
        </>
      )}
            
    </div>
  )
}

export default ReserveFormPromo