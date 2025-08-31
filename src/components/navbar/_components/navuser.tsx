import Link from "next/link"

const NavUser = () => {
  return (
    <div>
        <ul className="md:flex hidden gap-1 md:gap-5 font-semibold md:text-lg text-md">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href="/activity">Activity</Link>
                </li>
                <li>
                    <Link href="/contact">Contact Us</Link>
                </li>
        </ul>
    </div>
  )
}

export default NavUser