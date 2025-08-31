import { Metadata } from "next"
import Headersection from "@/components/header-section"
import {IoEyeOutline,IoLocateOutline} from "react-icons/io5"

export const metadata: Metadata = {
    title: "About",
    description: "who we are",
}

const AboutPage = () => {
  return (
    <div>
        <Headersection title="About Us" subTitle="Lorem ipsum dolor sit amet."/>
        <div className="max-w-screen-xl mx-auto py-20 px-4">
            <div className="grid md:grid-cols-2 gap-8">
                <img src="/images/about-image.jpg" width={650} height={579} alt="About Image"/>
                <div>
                    <h1 className="text-5xl font-semibold text-gray-900 mb-4">Who We Are</h1>
                    <p className="text-gray-700 py-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti at earum natus omnis exercitationem fugiat eum ut optio libero?</p>
                    <ul className="list-item space-y-6 pt-8">
                        <li className="flex gap-5">
                            <div className="flex-none mt-1">
                                <IoEyeOutline className="size-7"/>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa vero, odio laborum asperiores tempora reiciendis.</p>
                            </div>
                        </li>

                        <li className="flex gap-5">
                            <div className="flex-none mt-1">
                                <IoLocateOutline className="size-7"/>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                                <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam ipsum voluptatibus omnis dolorem veniam fuga vel sunt recusandae ducimus necessitatibus!</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage