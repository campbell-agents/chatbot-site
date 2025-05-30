import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
        <Link href="/" style={{ marginRight: '15px', color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link href="/about" style={{ marginRight: '15px', color: '#fff', textDecoration: 'none' }}>About</Link>
        <Link href="/reviews" style={{ color: '#fff', textDecoration: 'none' }}>Reviews</Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
