// pages/chat.jsx
import { useEffect } from 'react'
import Head from 'next/head'

export default function Chat() {
  useEffect(() => {
    // 1) Dynamically inject the SDK script
    const script = document.createElement('script')
    script.src =
      'https://campbell05.app.n8n.cloud/webhook/ce0eb04f-72fa-4669-b003-9ed24b237730/chat/sdk.js'
    script.async = true

    // 2) Once it's loaded, init the chat widget
    script.onload = () => {
      // Pull any saved session ID from storage
      const savedSessionId = sessionStorage.getItem('chat-session-id')

      // Initialize the chat
      // @ts-ignore
      const chat = window.N8NChat.init({
        selector: '#n8n-chat',
        sessionId: savedSessionId || undefined,
      })

      // 3) When n8n hands you a new session ID, persist it
      chat.on('session', ({ sessionId }) => {
        sessionStorage.setItem('chat-session-id', sessionId)
      })
    }

    // 4) Inject into the DOM
    document.body.appendChild(script)

    // Clean up on unmount
    return () => {
      document.body.removeChild(script)
    }
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