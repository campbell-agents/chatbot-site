// global.d.ts
import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "n8n-chat-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  interface Window {
    n8nChatWidget: {
      init(options: { url: string; title?: string }): void;
    };
  }
}