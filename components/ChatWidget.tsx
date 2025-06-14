'use client';

import { useEffect, useRef, useState } from 'react';

type Sender = 'You' | 'Bot';
type ChatMessage = { from: Sender; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string | null>(null);

  // generate or retrieve session ID once
  useEffect(() => {
    let id = sessionIdRef.current;
    if (!id) {
      id = Math.random().toString(36).substring(2, 10);
      sessionIdRef.current = id;
    }
  }, []);

  // seed initial bot greeting when widget opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          from: 'Bot' as Sender,
          text: 'Hi there! I’m your Virtual Agent—how can I help you today?'
        }
      ]);
    }
  }, [open, messages.length]);

  // auto-scroll on new messages or when opening
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { from: 'You' as Sender, text: input }
    ];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch(
        'https://campbell05.app.n8n.cloud/webhook/ce0eb04f-72fa-4669-b003-9ed24b237730/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'sendMessage',
            sessionId: sessionIdRef.current,
            chatInput: input
          })
        }
      );

      const raw = await res.text();
      let parsed = raw.trim();

      try {
        const json = JSON.parse(parsed);
        parsed = typeof json.output === 'string' ? json.output : parsed;
      } catch {}

      setMessages([
        ...newMessages,
        { from: 'Bot' as Sender, text: parsed }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { from: 'Bot' as Sender, text: 'Error reaching server.' }
      ]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white text-xl flex items-center justify-center shadow-lg z-50"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-xl rounded-xl p-4 flex flex-col z-50">
          <div
            ref={messagesRef}
            className="flex-1 overflow-y-auto space-y-2 text-sm pr-1"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg max-w-[90%] ${
                  m.from === 'You'
                    ? 'bg-blue-600 text-white self-end ml-auto'
                    : 'bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white self-start mr-auto'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={send} className="mt-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded border border-zinc-300 dark:border-zinc-700 px-2 py-1 bg-white dark:bg-zinc-800 text-black dark:text-white"
            />
            <button type="submit" className="px-3 py-1 bg-black text-white rounded">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}