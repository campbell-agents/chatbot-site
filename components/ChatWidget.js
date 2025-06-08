import { useEffect } from "react";
import { embed } from "@n8n/chat";

export default function ChatWidget() {
  useEffect(() => {
    embed({
      selector: "#n8n-chat-btn",
      workflowUrl: "https://campbell05.app.n8n.cloud/webhook/ce0eb04f-72fa-4669-b003-9ed24b237730/chat",
      theme: {
        button: {
          backgroundColor: "#000000",
          iconColor: "#ffffff",
        },
      },
    });
  }, []);

  return <div id="n8n-chat-btn" />;
}