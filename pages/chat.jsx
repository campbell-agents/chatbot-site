// pages/chat.jsx
import { useEffect } from 'react'
import Head from 'next/head'

export default function Chat() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://campbell05.app.n8n.cloud/webhook/ce0eb04f-72fa-4669-b003-9ed24b237730/chat/sdk.js'
    script.async = true
    script.onload = () => {
      const sessionId = sessionStorage.getItem('chat-session-id')
      // @ts-ignore
      window.N8NChat.init({
        selector: '#n8n-chat',
        sessionId,
      })
    }
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <div
        id="n8n-chat"
        style={{ width: '100%', height: '600px', position: 'relative' }}
      />
    </>
  )
}