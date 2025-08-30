import AccountClient from "./AccountClient"
import { Metadata } from "next"

export const metadata:Metadata = {
    title: "My-Account",
    description: "Your Account Settings"
}

const AccountPage = () => {

    return (
        <div className="max-w-screen-2xl px-4 py-16 mt-10 mx-auto">
            <AccountClient/>
        </div>
    )
}

export default AccountPage
