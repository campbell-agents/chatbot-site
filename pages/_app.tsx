// pages/_app.tsx
import "@/styles/globals.css"; // MUST be first to apply Tailwind
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="p-4 bg-black text-white text-sm flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/reviews">Reviews</Link>
      </nav>

      {/* Render the active page */}
      <Component {...pageProps} />
    </>
  );
}