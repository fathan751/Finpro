import React from 'react'
import { Metadata } from 'next'
import TransactionDetail from '@/components/transaction/transaction-detail'
import { Suspense } from 'react'

export const metadata:Metadata = {
    title: "Transaction Detail"
}

const MyTransactionDetail = async ({params}:{params: Promise<{id: string}>}) => {

    const transactionId = (await params).id

  return (
    <div className='min-h-screen bg-slate-50'>
        <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
            {/* Transaction Detail */}
            <Suspense fallback={<p>Loading...</p>}>
                <TransactionDetail transactionId={transactionId}/>
            </Suspense>
        </div>
    </div>
  )
}

export default MyTransactionDetail