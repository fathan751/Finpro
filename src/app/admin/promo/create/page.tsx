import { Metadata } from "next"
import CreatePromoClient from "./CreatePromoClient"

export const metadata: Metadata = {
  title:"Create Promo",
  description:"Create Promo Page"
}

const CreatePromoPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
        <CreatePromoClient/>
    </div>
  )
}

export default CreatePromoPage