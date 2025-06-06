import "@/styles/globals.css"; // MUST be first to apply Tailwind

import type { AppProps } from "next/app";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export default function App({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const freshId = generateId();
    setUserId(freshId);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = input;
    setMessages((prev) => [...prev, "You: " + userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: userMsg, session_id: userId }),
      });

      const botJson = await res.json();
      const cleanText =
        Array.isArray(botJson) && botJson.length > 0 && botJson[0].output
          ? botJson[0].output.replace(/\\n/g, "\n")
          : botJson.output
          ? botJson.output.replace(/\\n/g, "\n")
          : "No response from bot.";

      setMessages((prev) => [...prev, "Bot: " + cleanText]);
    } catch {
      setMessages((prev) => [...prev, "Bot: (Error)"]);
    }
  };

  return (
    <>
      <nav className="p-4 bg-black text-white text-sm flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/reviews">Reviews</Link>
      </nav>

      {/* Chat Widget */}
      <div className="fixed bottom-5 right-5 z-50">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="w-[60px] h-[60px] rounded-full bg-black text-white text-xl"
            aria-label="Open chat"
          >
            💬
          </button>
        ) : (
          <div className="w-[300px] h-[400px] bg-white rounded-xl shadow-xl flex flex-col justify-between p-3">
            <div className="flex-1 overflow-y-auto mb-2">
              {messages.map((msg, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap text-black">
                  {msg}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-2 py-1 rounded border border-gray-300"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-black text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-2 text-right text-xs text-gray-500 underline"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <Component {...pageProps} />
    </>
  );
}