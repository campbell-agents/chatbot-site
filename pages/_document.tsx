import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Removed broken SDK injection */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}