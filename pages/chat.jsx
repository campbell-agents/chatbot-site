// pages/chat.jsx
import { useState, useEffect, useRef } from 'react'

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  // 1) Load or generate a persistent sessionId
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('chatSessionId')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('chatSessionId', id)
    }
    return id
  })

  // 2) Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 3) Send & receive via your n8n webhook
  async function sendMessage() {
    if (!input) return
    const text = input
    setMessages((m) => [...m, { from: 'you', text }])
    setInput('')

    const res = await fetch(
      'https://campbell05.app.n8n.cloud/webhook/ce0eb04f-72fa-4669-b003-9ed24b237730/chat',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, chatInput: text }),
      }
    )
    const json = await res.json()
    const reply = json.output || 'No response'
    setMessages((m) => [...m, { from: 'bot', text: reply }])
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 16 }}>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          height: 400,
          overflowY: 'auto',
          padding: 8,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === 'you' ? 'right' : 'left',
              margin: '8px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: m.from === 'you' ? '#ddd' : '#8cf',
                borderRadius: 12,
                padding: '4px 12px',
                maxWidth: '80%',
                wordBreak: 'break-word',
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        <input
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message…"
        />
        <button
          style={{ marginLeft: 8, padding: '8px 16px' }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
)
}