import EditCategoryForm from "./edit-form-category"
import { CategoryProps } from "@/types/category"

interface EditCategoryProps {
    categoryData: CategoryProps,
    categoryId: string
}

const EditCategory = ({categoryData,categoryId}:EditCategoryProps) => {
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Edit a Activity</h1>
        <EditCategoryForm categoryData={categoryData} categoryId={categoryId}/>
    </div>
  )
}

export default EditCategory