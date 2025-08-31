import DashboardCards from "@/components/admin/dashboard-card"
import { Suspense } from "react"
import ReservationList from "@/components/admin/reservation-list"
export const metadata = {
  title: "Dashboard",
  description: "Admin Page"
}

const DashboardPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <Suspense fallback={<p>Loading cards...</p>}>
        <DashboardCards/>
      </Suspense>
      <Suspense fallback={<p>Loading cards...</p>}>
        <ReservationList/>
      </Suspense>
    </div>
  )
}

export default DashboardPage