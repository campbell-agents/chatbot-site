'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import { generateId, getSessionCookie, setSessionCookie } from '../utils/cookies';

export default function Chat() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/chat-sdk.js';
    script.async = true;

    script.onload = () => {
      let sessionId = getSessionCookie();
      if (!sessionId) {
        sessionId = generateId();
        setSessionCookie(sessionId);
      }

      window.N8NChat.init({
        selector: '#n8n-chat',
        sessionId,
      });
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head><title>Chat</title></Head>
      <div id="n8n-chat" style={{ width: '100%', height: '600px', position: 'relative' }} />
    </>
  );
}