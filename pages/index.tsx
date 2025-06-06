// pages/index.tsx
import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
        <h1 className="text-5xl font-semibold tracking-tight mb-4">
          Welcome to CampbellVirtual
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          Custom virtual agents built for your business—clean, fast, and reliable.
        </p>
        <Link href="/chat">
          <a className="text-lg px-6 py-3 rounded-2xl shadow-md bg-black text-white">
            Get Started
          </a>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Custom AI Integrations</h3>
              <p className="text-gray-600">
                Seamless AI workflows that connect your tools and data for smarter automation.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Virtual Agents</h3>
              <p className="text-gray-600">
                AI-powered chatbots tailored to your unique customer needs and branding.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                Continuous maintenance and updates to keep your AI agents performing at their best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CampbellVirtual. All rights reserved.
      </footer>
    </main>
  );
}