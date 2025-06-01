import { useEffect, useState } from 'react';

export default function Home() {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate a simple unique sessionId (persisted per tab reload)
    const id = localStorage.getItem('chat_session') || crypto.randomUUID();
    localStorage.setItem('chat_session', id);
    setSessionId(id);
  }, []);

  return (
    <div className="p-10 space-y-10">
      <div className="text-4xl font-bold text-blue-600">
        Tailwind is working!
      </div>

      {sessionId && (
        <iframe
          src={`https://campbell05.app.n8n.cloud/webhook/3199d7cb-ce70-49aa-b81e-95921d60ddc3/chat?sessionId=${sessionId}`}
          width="100%"
          height="600"
          style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          title="Chatbot"
        />
      )}
    </div>
  );
}
