// global.d.ts
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // tell TS about the custom element
      'n8n-chat-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  interface Window {
    // tell TS about the widget initializer
    n8nChatWidget: {
      init: (opts: { url: string; title?: string }) => void;
    };
  }
}

export {};