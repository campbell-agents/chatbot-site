export {};

declare global {
  interface Window {
    N8NChat: {
      init: (options: { selector: string; sessionId: string }) => void;
    };
    __chatLoaded?: boolean; // <-- add this line
  }
}