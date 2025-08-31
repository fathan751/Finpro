"use client"

import Card from "./card"
import { ActivityProps } from "@/types/activity"
import { BASE_URL, API_KEY } from "@/lib/constant"
import { useState, useEffect } from "react"

interface CategoryProps {
  id: string
  name: string
}

const MainActivity = () => {
  const [activities, setActivities] = useState<ActivityProps[]>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const limit = 6

  // untuk ngambil kategorinya
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/categories`, {
        headers: { apiKey: API_KEY ?? "" },
        cache: "no-store",
      })
      const data = await res.json()
      setCategories(data.data)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BASE_URL}/api/v1/activities`
      if (selectedCategory !== "all") {
        url = `${BASE_URL}/api/v1/activities-by-category/${selectedCategory}`
      }

      const res = await fetch(url, {
        headers: { apiKey: API_KEY ?? "" },
        cache: "no-store",
      })
      const data = await res.json()
      setActivities(data.data)
      setPage(1) 
    }
    fetchData()
  }, [selectedCategory])

  //  ini fungsinyo searh filtet
  const filteredData = activities.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ini pagination
  const totalPages = Math.ceil(filteredData.length / limit)
  const start = (page - 1) * limit
  const currentData = filteredData.slice(start, start + limit)

  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-md border ${
            selectedCategory === "all"
              ? "bg-[#ff385c] text-white"
              : "bg-white text-gray-800"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-md border ${
              selectedCategory === cat.id
                ? "bg-[#ff385c] text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search activity..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPage(1)
          }}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff385c]"
        />
      </div>

      {/* List Cards */}
      <div className="grid gap-7 md:grid-cols-3">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <Card
              key={item.id}
              activityId={item.id}
              title={item.title}
              imageUrls={item.imageUrls[0]}
              price={item.price}
              totalReview={item.total_reviews}
              rating={item.rating}
            />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No activities found
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-md border ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                page === i + 1
                  ? "bg-[#ff385c] text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-md border ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default MainActivity
