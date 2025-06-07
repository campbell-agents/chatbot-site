// pages/chat.tsx
import { useEffect } from "react";

export default function ChatPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.n8nChatWidget) {
      window.n8nChatWidget.init({
        url: "https://campbell05.app.n8n.cloud/webhook/ff370f0f-663b-41eb-9edd-dabb844716bf/chat",
        title: "CampbellVirtual Assistant",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* this custom element comes from the n8n widget script */}
      <n8n-chat-widget />
    </div>
  );
}