
import React, { useContext } from 'react'
import { StoreContex } from '../contex/StoreContex'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContex)

  const navigate = useNavigate()

  return (
    <main className="mx-auto min-h-screen w-[90%] max-w-[1200px] py-10 sm:py-14">
      <h1 className="mb-8 text-3xl font-bold text-white">Your Cart</h1>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1c1c1c]">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-4 border-b border-white/10 px-5 py-4 text-sm font-semibold text-gray-400">
            <p>Items</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div
                  key={item._id}
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-4 border-b border-white/5 px-5 py-4 text-sm text-gray-200 transition hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="h-12 w-12 rounded-lg object-cover"
                      src={url+"/images/"+item.image}
                      alt={item.name}
                    />
                    <p className="font-medium">{item.name}</p>
                  </div>

                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p className="font-semibold text-orange-500">
                    ₹{item.price * cartItems[item._id]}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-fit rounded-md px-3 py-1 text-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                    aria-label={`Remove ${item.name}`}
                  >
                    X
                  </button>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <section className="h-fit rounded-2xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Cart Total</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <p>Subtotal</p>
              <p className="text-white">₹{getTotalCartAmount()}</p>
            </div>

            <hr className="border-white/10" />

            <div className="flex justify-between text-gray-400">
              <p>Delivery Fee</p>
              <p className="text-white">
                ₹{getTotalCartAmount() > 0 ? 30 : 0}
              </p>
            </div>

            <hr className="border-white/10" />

            <div className="flex justify-between text-base font-bold text-white">
              <p>Total</p>
              <p className="text-orange-500">₹{getTotalCartAmount() + (getTotalCartAmount() > 0 ? 30 : 0)}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/order')}
            className="mt-7 w-full rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            Proceed to Checkout
          </button>
        </section>

        <section className="h-fit rounded-2xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Promo Code</h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            If you have a promo code, enter it here.
          </p>

          <div className="mt-5 flex overflow-hidden rounded-lg border border-white/10 bg-[#111111]">
            <input
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              type="text"
              placeholder="Promo code"
            />

            <button
              type="button"
              className="bg-orange-600 px-5 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Cart
