import TransactionClient from "./TransactionClient"

const TransactionPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-800">Transaction List</h1>
        </div>
        <TransactionClient/>
    </div>
  )
}

export default TransactionPage