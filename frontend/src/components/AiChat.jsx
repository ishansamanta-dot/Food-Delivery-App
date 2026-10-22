import React, { useContext, useState } from 'react'
import axios from 'axios'
import { StoreContex } from '../contex/StoreContex'

const AiChat = () => {
  const { url, token, addToCart } = useContext(StoreContex)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! Tell me what you feel like eating and I'll suggest something from our menu.",
      items: []
    },
  ])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const history = messages.map((m) => ({
      role: m.role,
      content: m.content
    }))

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, items: [] }
    ])
    setInput("")
    setLoading(true)

    try {
      const res = await axios.post(
        url + "/api/ai/chat",
        { message: text, history },
        { headers: { token } }
      )

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply,
          items: res.data.items || []
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          items: []
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!token) return null

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-colors duration-200 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
      >
        <span>{open ? "✕" : "✦"}</span>
        {open ? "Close" : "Ask AI"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(580px,calc(100vh-130px))] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#181818] shadow-2xl shadow-black/40">
          <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-[#1c1c1c] px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-xl text-orange-400">
              ✦
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-white">
                Food Assistant
              </h3>
              <p className="mt-0.5 text-xs text-gray-400">
                Find something delicious
              </p>
            </div>

            <span className="h-2 w-2 rounded-full bg-green-500" />
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <p
                  className={`mb-1 inline-block max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-left text-sm leading-6 ${
                    m.role === "user"
                      ? "rounded-br-sm bg-orange-600 text-white"
                      : "rounded-bl-sm border border-white/5 bg-[#252525] text-gray-200"
                  }`}
                >
                  {m.content}
                </p>

                {m.items?.map((item) => (
                  <div
                    key={item._id}
                    className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#222222] p-3 text-left transition-colors hover:border-orange-500/40"
                  >
                    <img
                      src={url + "/images/" + item.image}
                      alt={item.name}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-orange-400">
                        ₹{item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(item._id)}
                      className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-500"
                    >
                      Add +
                    </button>
                  </div>
                ))}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
                Finding something delicious...
              </div>
            )}
          </div>

          <form
            onSubmit={send}
            className="flex shrink-0 gap-2 border-t border-white/10 bg-[#1c1c1c] p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. spicy veg under ₹200"
              maxLength={500}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#111111] px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-orange-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AiChat