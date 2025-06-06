import { useState, useEffect } from 'react';

export default function ChatPage() {
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput]       = useState('');
  const [history, setHistory]   = useState([]); // [{ role, text }]

  // On mount: init sessionId in sessionStorage
  useEffect(() => {
    let id = sessionStorage.getItem('chat_session_id');
    if (!id) {
      id = crypto.randomUUID();  // or any UUID generator
      sessionStorage.setItem('chat_session_id', id);
    }
    setSessionId(id);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    // show user’s message immediately
    setHistory(h => [...h, { role: 'user', text: input }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatInput: input,        // must match your handler
        sessionId: sessionId,    // pulled from sessionStorage
      }),
    });
    const json = await res.json();

    // show the bot’s reply
    setHistory(h => [...h, { role: 'bot', text: json.reply }]);
    setInput('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">AI Chat</h1>
      <div className="border h-80 overflow-y-auto p-2 mb-4">
        {history.map((m,i) => (
          <p key={i} className={m.role === 'user'? 'text-right' : 'text-left'}>
            <strong>{m.role === 'user' ? 'You:' : 'Bot:'}</strong> {m.text}
          </p>
        ))}
      </div>

      <textarea
        rows="2"
        className="w-full border p-2 mb-2"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={sendMessage}
        disabled={!sessionId}
      >
        Send
      </button>
    </div>
  );
}