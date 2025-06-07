// pages/chat.tsx
'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function Chat() {
  useEffect(() => {
    // Dynamically load the remote SDK
    const script = document.createElement('script');
    script.src =
      'https://campbell05.app.n8n.cloud/webhook/ce0eb04f-72fa-4669-b003-9ed24b237730/chat/sdk.js';
    script.async = true;

    script.onload = () => {
      // Pull any saved session ID from sessionStorage
      const saved = sessionStorage.getItem('chat-session-id') || undefined;

      // @ts-ignore: injected by the SDK
      const chat = window.N8NChat.init({
        selector: '#n8n-chat',
        sessionId: saved,
      });

      // Persist any new session ID
      chat.on('session', ({ sessionId }: { sessionId: string }) => {
        sessionStorage.setItem('chat-session-id', sessionId);
      });
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
  );
}