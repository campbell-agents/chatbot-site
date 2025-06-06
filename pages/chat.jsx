import React, { useState, useEffect } from 'react';

export default function ChatPage() {
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]); // { from: 'you'|'bot', text }
  const [input, setInput] = useState('');

  // On mount, grab or generate a sessionId in localStorage
  useEffect(() => {
    let id = localStorage.getItem('cvSessionId');
    if (!id) {
      id = Math.random().toString(36).substr(2, 8);
      localStorage.setItem('cvSessionId', id);
    }
    setSessionId(id);
  }, []);

  // send button / Enter key handler
  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    // echo the user message immediately
    setHistory(h => [...h, { from: 'you', text: input }]);
    const payload = { action: 'sendMessage', chatInput: input, sessionId };
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const { response } = await res.json();
      setHistory(h => [...h, { from: 'bot', text: response }]);
    } catch (err) {
      console.error(err);
      setHistory(h => [...h, { from: 'bot', text: '⚠️ Error talking to bot' }]);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Chat with our AI Agent</h2>
      <div className="border h-64 p-4 mb-4 overflow-auto space-y-2 bg-gray-50">
        {history.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}
          >
            <span
              className={`px-3 py-1 rounded ${
                m.from === 'you' ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border px-3 py-2 rounded-l"
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}