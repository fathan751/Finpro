// UploadService.ts
import axios from "axios"
import { BASE_URL,API_KEY } from "@/lib/constant"

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("image", file) 

  const response = await axios.post(`${BASE_URL}/api/v1/upload-image`, formData, {
    headers: {
      apiKey: API_KEY,
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data.url
}
