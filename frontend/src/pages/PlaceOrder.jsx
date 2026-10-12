
import React, { useContext } from 'react'
import { StoreContex } from '../contex/StoreContex'

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContex)

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500'

  return (
    <main className="mx-auto min-h-screen w-[90%] max-w-[1200px] py-10 sm:py-14">
      <h1 className="mb-8 text-3xl font-bold text-white">Checkout</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12"
      >
        <section className="rounded-2xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-white">
            Delivery Information
          </h2>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                type="text"
                placeholder="First Name"
                required
              />
              <input
                className={inputClass}
                type="text"
                placeholder="Last Name"
                required
              />
            </div>

            <input
              className={inputClass}
              type="email"
              placeholder="Email address"
              required
            />

            <input
              className={inputClass}
              type="text"
              placeholder="Street"
              required
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                type="text"
                placeholder="City"
                required
              />
              <input
                className={inputClass}
                type="text"
                placeholder="State"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                type="text"
                placeholder="PIN Code"
                required
              />
              <input
                className={inputClass}
                type="tel"
                placeholder="Phone"
                required
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Cart Total</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <p>Subtotal</p>
              <p className="text-white">₹{getTotalCartAmount()}</p>
            </div>

            <hr className="border-white/10" />

            <div className="flex justify-between text-gray-400">
              <p>Delivery Fee</p>
              <p className="text-white">₹{getTotalCartAmount() > 0 ? 30 : 0}</p>
            </div>

            <hr className="border-white/10" />

            <div className="flex justify-between text-base font-bold text-white">
              <p>Total</p>
              <p className="text-orange-500">₹{getTotalCartAmount() + (getTotalCartAmount() > 0 ? 30 : 0)}</p>
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            Proceed to Payment
          </button>
        </section>
      </form>
    </main>
  )
}

export default PlaceOrder
