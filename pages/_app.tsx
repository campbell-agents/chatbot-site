import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
        <a href="/" style={{ marginRight: '15px', color: '#fff', textDecoration: 'none' }}>Home</a>
        <a href="/about" style={{ marginRight: '15px', color: '#fff', textDecoration: 'none' }}>About</a>
        <a href="/reviews" style={{ color: '#fff', textDecoration: 'none' }}>Reviews</a>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
