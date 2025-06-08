// pages/index.tsx
import { useEffect } from "react";
import { getSessionCookie, setSessionCookie, generateId } from "../utils/cookies";

// Ensure TypeScript knows about N8NChat on the Window object
declare global {
  interface Window {
    N8NChat?: {
      init: (options: { selector: string; sessionId: string }) => void;
    };
  }
}

export default function HomePage() {
  useEffect(() => {
    const sessionId = getSessionCookie() || generateId();
    setSessionCookie(sessionId);

    const script = document.createElement("script");
    script.src = "/chat-sdk.js"; // chat-sdk.js must exist in /public
    script.async = true;
    script.onload = () => {
      // Wait for the global to load before calling init
      if (window.N8NChat) {
        window.N8NChat.init({
          selector: "#chat-container",
          sessionId,
        });
      } else {
        console.error("N8NChat failed to load.");
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold">Welcome to Campbell Virtual</h1>
        <p className="mt-2 text-lg text-gray-600">
          Custom virtual agents built to fit your needs.
        </p>
        <button className="mt-6 px-6 py-2 bg-black text-white rounded">
          Get Started
        </button>
      </section>

      <section className="py-12 bg-gray-50">
        <h2 className="text-center text-2xl font-semibold mb-8">What We Offer</h2>
        <div className="flex justify-center gap-6 flex-wrap max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow w-72">
            <h3 className="font-bold mb-2">Custom AI Integrations</h3>
            <p className="text-sm text-gray-700">
              Seamless AI workflows that connect your tools and data for smarter automation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow w-72">
            <h3 className="font-bold mb-2">Virtual Agents</h3>
            <p className="text-sm text-gray-700">
              AI-powered chatbots tailored to your unique customer needs and branding.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow w-72">
            <h3 className="font-bold mb-2">Ongoing Support</h3>
            <p className="text-sm text-gray-700">
              Continuous maintenance and updates to keep your AI agents performing at their best.
            </p>
          </div>
        </div>
      </section>

      {/* Chat will attach to this div */}
      <div id="chat-container" />
    </div>
  );
}