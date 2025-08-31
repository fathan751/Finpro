import MyTransactionList from "@/components/transaction/my-transaction-list"
import { Metadata } from "next"

export const metadata:Metadata = {
    title:"My Transaction"
}

const MyTransactionPage = async () => {

  return (
    <div className="min-h-screen bg-slate-50">
        <div className="max-w-screen-xl mx-auto mt-10 py-20 px-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl text-gray-800 mt-2">Hi,{}</h3>
                    <p className="mt-1 font-medium mb-4">Here&apos;s Your Transaction History :</p>
                </div>
            </div>
            <div className="rounded-sm">
                <MyTransactionList />
            </div>
        </div>
    </div>
  )
}

export default MyTransactionPage