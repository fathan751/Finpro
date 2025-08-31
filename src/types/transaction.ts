export interface PaymentMethodProps {
  id: string
  name: string
  virtual_account_number: string
  virtual_account_name: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface TransactionItemProps {
  id: string
  transactionId: string
  title: string
  description: string
  price: number
  price_discount: number
  quantity: number
  imageUrls: string[]
  createdAt: string
  updatedAt: string
}

export interface TransactionProps {
  id: string
  userId: string
  paymentMethodId: string
  invoiceId: string
  status: string
  totalAmount: number
  proofPaymentUrl: string | null
  orderDate: string
  expiredDate: string
  createdAt: string
  updatedAt: string
  payment_method: PaymentMethodProps
  transaction_items: TransactionItemProps[]
}
