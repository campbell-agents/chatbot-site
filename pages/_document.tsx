import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* n8n Chat Widget SDK */}
        <script
          src="https://campbell05.app.n8n.cloud/webhook/ff370f0f-663b-41eb-9edd-dabb844716bf/chat/sdk.js"
          async
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}