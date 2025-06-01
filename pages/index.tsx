import React from "react";
import { Button } from "@/components/ui/button";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
        <h1 className="text-5xl font-semibold tracking-tight mb-4">
          Welcome to CampbellVirtual
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          Professional websites and custom AI chatbots designed for small businesses. Clean, fast, and effective.
        </p>
        <Button className="text-lg px-6 py-3 rounded-2xl shadow-md">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Modern Web Design</h3>
              <p className="text-gray-600">Responsive, aesthetic, and built with best practices in mind.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Custom AI Chatbots</h3>
              <p className="text-gray-600">Integrated AI that actually helps your customers, not frustrates them.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">We keep your tools working and your site up to date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center text-sm text-gray-500">
<span>{String.fromCharCode(169)} {new Date().getFullYear()} CampbellVirtual. All rights reserved.</span>
      </footer>
    </main>
  );
}