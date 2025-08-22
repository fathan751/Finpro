"use client"
import { useState } from "react"

const ContactForm = () => {

    const [isSubmited,setIsSubmited] = useState(false)

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm">
        <form action="">
            <div className={isSubmited?`bg-green-100 opacity-100 duration-300 transition-opacity `:`opacity-0 transition-opacity duration-300  bg-transparent`}>
                <p className="text-green-800 p-3 font-semibold">Thanks for contact us.</p>
                </div>
            <div className="grid md:grid-cols-2 gap-7 mt-6">
                <div>
                    <input type="text" name="name" className="bg-gray-50 p-3 border-gray-200 rounded-sm w-full font-light" placeholder="Name*"/>
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-red-500 mt-2">message</p>
                    </div>
                </div>

                <div>
                    <input type="email" name="email" className="bg-gray-50 p-3 border-gray-200 rounded-sm w-full font-light" placeholder="johndoe@example.com*"/>
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-red-500 mt-2">message</p>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <input type="text" name="subject" className="bg-gray-50 p-3 border-gray-200 rounded-sm w-full font-light" placeholder="Subject*"/>
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-red-500 mt-2">message</p>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <textarea name="message" rows={5} className="bg-gray-50 p-3 border-gray-200 rounded-sm w-full font-light" placeholder="Your Message*"></textarea>
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-red-500 mt-2">message</p>
                    </div>
                </div>
            </div>
            <button onClick={() => setIsSubmited(true)} type="button" className="px-10 py-4 text-center font-semibold text-white w-full bg-[#ff385c] rounded-sm hover:bg-[#a31d1d] cursor-pointer">Send Message</button>
        </form>
    </div>
  )
}

export default ContactForm