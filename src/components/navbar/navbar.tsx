
import Link from "next/link"
import Navburger from "./navburger"
import Navlink from "./navlink"



const Navbar = () =>{
    return(
        <div className="fixed top-0 w-full bg-white shadow-sm z-20">
            <div className="max-w-[1800px] mx-auto flex  items-center justify-between p-4">
                <Link href={'/'}>
                    <p className="text-2xl md:text-3xl font-bold">Travelins</p>
                </Link>
                <Navlink/>
                <Navburger/>
            </div>
        </div>
    )
}

export default Navbar