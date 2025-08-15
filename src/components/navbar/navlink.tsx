import Link from "next/link"

const Navlink = () => {


    return(
        <div>
            <ul className="flex gap-1 md:gap-5 font-semibold text-lg">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href="/experiences">Experience</Link>
                </li>
                <li>
                    <Link href="services">Services</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navlink