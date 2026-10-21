import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContex } from '../contex/StoreContex'
import FoodItems from './FoodItems'

const AiRecommended = () => {
  const { url, token } = useContext(StoreContex)
  const [items, setItems] = useState([])
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setItems([])
      return
    }

    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const res = await axios.post(
          url + "/api/ai/recommend",
          { mode: "home" },
          { headers: { token } }
        )
        if (!cancelled && res.data.success) {
          setItems(res.data.items || [])
          setReply(res.data.reply || "")
        }
      } catch {
        if (!cancelled) setItems([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [token, url])

  if (!token || (!loading && items.length === 0)) return null

  return (
    <section className="mt-10 sm:mt-14">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Recommended for you</h2>
      {reply && <p className="mt-2 text-sm text-gray-400">{reply}</p>}

      {loading ? (
        <p className="mt-6 text-sm text-gray-500">Finding dishes you'll love...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <FoodItems
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default AiRecommended