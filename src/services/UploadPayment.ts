import axios from "axios"
import { API_KEY, BASE_URL } from "@/lib/constant"

export const updatePaymentProof = async (
  token: string,
  transactionId: string,
  proofPaymentUrl: string
) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/update-transaction-proof-payment/${transactionId}`,
    { proofPaymentUrl },
    {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
