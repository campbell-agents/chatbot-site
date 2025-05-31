import type { AppProps } from "next/app";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = input;
    setMessages((prev) => [...prev, "You: " + userMsg]);
    setInput("");

    try {
      const res = await fetch(
        "https://campbell05.app.n8n.cloud/webhook/3199d7cb-de70-49aa-b81e-95921d60ddc3/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg }),
        }
      );
     const botJson = await res.json();

// Check if the response is an array (a list), if yes get first item's output
const cleanText = Array.isArray(botJson) && botJson.length > 0 && botJson[0].output
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
      <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
        <Link href="/" style={{ marginRight: "15px", color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link href="/about" style={{ marginRight: "15px", color: "#fff", textDecoration: "none" }}>
          About
        </Link>
        <Link href="/reviews" style={{ color: "#fff", textDecoration: "none" }}>
          Reviews
        </Link>
      </nav>

      {/* Chat Widget */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            style={{
              borderRadius: "50%",
              width: 60,
              height: 60,
              backgroundColor: "#333",
              color: "white",
              fontSize: 20,
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Open chat"
          >
            💬
          </button>
        ) : (
          <div
            style={{
              width: 300,
              height: 400,
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              borderRadius: 10,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: 5, whiteSpace: "pre-wrap" }}>
                  {msg}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ display: "flex" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ flex: 1, padding: 5, borderRadius: 5, border: "1px solid #ccc" }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage} style={{ marginLeft: 5 }}>
                Send
              </button>
            </div>

            <button onClick={() => setOpen(false)} style={{ marginTop: 5, alignSelf: "flex-end" }}>
              Close
            </button>
          </div>
        )}
      </div>

      <Component {...pageProps} />
    </>
  );
}