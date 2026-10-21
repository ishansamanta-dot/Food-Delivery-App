import React, { useContext, useState } from 'react'
import axios from 'axios'
import { StoreContex } from '../contex/StoreContex'

const AiChat = () => {
  const { url, token, addToCart } = useContext(StoreContex)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Tell me what you feel like eating and I'll suggest something from our menu.", items: [] },
  ])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const history = messages.map((m) => ({ role: m.role, content: m.content }))
    setMessages((prev) => [...prev, { role: "user", content: text, items: [] }])
    setInput("")
    setLoading(true)

    try {
      const res = await axios.post(url + "/api/ai/chat", { message: text, history }, { headers: { token } })
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply, items: res.data.items || [] },
      ])
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again.", items: [] }])
    } finally {
      setLoading(false)
    }
  }

  if (!token) return null

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-500"
      >
        {open ? "Close" : "Ask AI"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-white/10 bg-[#1c1c1c] shadow-xl">
          <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-white">Food Assistant</div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <p className={`inline-block rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "bg-orange-600 text-white" : "bg-[#111111] text-gray-200"}`}>
                  {m.content}
                </p>

                {m.items?.map((item) => (
                  <div key={item._id} className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#111111] p-2 text-left">
                    <img src={url + "/images/" + item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-orange-500">₹{item.price}</p>
                    </div>
                    <button onClick={() => addToCart(item._id)} className="rounded-lg bg-orange-600 px-3 py-1 text-xs font-semibold text-white hover:bg-orange-500">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            ))}
            {loading && <p className="text-sm text-gray-500">Thinking...</p>}
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. spicy veg under ₹200"
              maxLength={500}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#111111] px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
            />
            <button type="submit" disabled={loading} className="rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white disabled:opacity-60">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AiChat