import CreateBannerForm from "./create-form-banner"

const CreateBanner = () => {
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Create New Banner </h1>
        <CreateBannerForm/>
    </div>
  )
}

export default CreateBanner