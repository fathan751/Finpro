import CartForm from "@/components/cart/cart-form"

const CartPage = () => {
  return (
    <div className='max-w-screen-xl mx-auto py-20 px-4'>
        <h1 className="py-5 font-bold text-2xl">Cart</h1>

        <CartForm/>

    </div>
  )
}

export default CartPage