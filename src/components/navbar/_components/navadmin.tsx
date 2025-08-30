import Link from "next/link"


const NavAdmin = () => {
  return (
    <div>
        <ul className="hidden md:flex gap-1 md:gap-5 font-semibold md:text-lg text-md">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href="/admin/activity">Manage Activity</Link>
                </li>
                <li>
                    <Link href="/admin/category">Category</Link>
                </li>
                <li>
                    <Link href="/admin/banner">Banners</Link>
                </li>
                <li>
                    <Link href="/admin/promo">Promo</Link>
                </li>
            </ul>
    </div>
  )
}

export default NavAdmin