import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContex } from '../contex/StoreContex'

const CartSuggestions = () => {
  const { url, token, cartItems, addToCart } = useContext(StoreContex)
  const [items, setItems] = useState([])
  const [reply, setReply] = useState("")

  const cartKey = Object.keys(cartItems || {})
    .filter((id) => cartItems[id] > 0)
    .sort()
    .join(",")

  useEffect(() => {
    if (!token || !cartKey) {
      setItems([])
      return
    }

    let cancelled = false
    const timer = setTimeout(async () => {
      try {
        const res = await axios.post(
          url + "/api/ai/recommend",
          { mode: "cart", cartItemIds: cartKey.split(",") },
          { headers: { token } }
        )
        if (!cancelled && res.data.success) {
          setItems(res.data.items || [])
          setReply(res.data.reply || "")
        }
      } catch {
        if (!cancelled) setItems([])
      }
    }, 800)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [cartKey, token, url])

  if (items.length === 0) return null

  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">You may also like</h2>
      {reply && <p className="mt-1 text-sm text-gray-400">{reply}</p>}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111111] p-3">
            <img src={url + "/images/" + item.image} alt={item.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{item.name}</p>
              <p className="text-sm font-semibold text-orange-500">₹{item.price}</p>
            </div>
            <button
              onClick={() => addToCart(item._id)}
              className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-500"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CartSuggestions