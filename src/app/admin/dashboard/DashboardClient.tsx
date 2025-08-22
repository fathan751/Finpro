"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get("token")
    const role = Cookies.get("role")

    if (!token || role !== "admin") {
      router.replace("/")
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="mt-20">
      <h1>Welcome Admin 👑</h1>
    </div>
  )
}
