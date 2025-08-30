"use client"

import { useEffect, useState } from "react"
import { fetchCategory } from "@/services/categoryService"
import { CategoryProps } from "@/types/category"
import { EditCategoryButton,DeleteCategoryButton } from "./buttonCategory"
import { formatDate } from "@/lib/utils"

const CategoryTable = () => {

    const [categories,setCategories] = useState<CategoryProps[]>([])
    const handleDeleteSuccess = (deletedId: string) => {
        setCategories(prev => prev.filter(category => category.id !== deletedId))
    }

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchCategory()
                setCategories(data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
    },[])

  return (
    <div className='bg-white p-4 mt-5 shadow-sm overflow-x-scroll'>
            <table className='w-full divide-y'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Image</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Category Name</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Created At</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Updated At</th>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {categories.map((category)=> (
                    <tr key={category.id} className='hover:bg-gray-100'>
                        <td className='px-6 py-4'><img src={category.imageUrl || "/images/placeholder.png"}
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null; 
                              target.src = "/images/placeholder.png";
                            }}
                             alt='category image' className='object-cover min-w-30 min-h-30 md:w-45 md:h-45 rounded-lg'/>
                        </td>
                        <td className='px-6 py-4'>{category.name}</td>
                        <td className="px-6 py-4">{formatDate(category.createdAt)}</td>
                        <td className="px-6 py-4">{formatDate(category.updatedAt)}</td>
                        <td className='px-6 py-4 text-right'>
                            <div className='flex items-center justify-center gap-1'>
                            <EditCategoryButton id={category.id}/>
                            <DeleteCategoryButton id={category.id} onSuccess={() => handleDeleteSuccess(category.id)}/> 
                            </div>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
  )
}

export default CategoryTable