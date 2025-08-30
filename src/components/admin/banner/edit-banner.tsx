import { CategoryProps } from "@/types/category"
import EditBannerForm from "./edit-form-banner"

interface EditBannerProps {
    bannerData: CategoryProps,
    bannerId: string
}

const EditBanner = ({bannerData,bannerId}:EditBannerProps) => {
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Edit a Banner</h1>
        <EditBannerForm bannerData={bannerData} bannerId={bannerId}/>
    </div>
  )
}

export default EditBanner