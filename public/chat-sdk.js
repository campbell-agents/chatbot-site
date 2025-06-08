window.N8NChat = {
  init: ({ selector, sessionId }) => {
    const button = document.querySelector(selector);
    if (!button) return;

    // Style chat button
    button.style.cssText = `
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: black;
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 9999;
    `;
    button.innerText = "💬";

    // Create chat window (initially hidden)
    const chatWindow = document.createElement("div");
    chatWindow.style.cssText = `
      position: fixed;
      bottom: 5rem;
      right: 1.5rem;
      width: 320px;
      height: 400px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      display: none;
      flex-direction: column;
      z-index: 9999;
    `;
    document.body.appendChild(chatWindow);

    chatWindow.innerHTML = `
      <div id="chat-messages" style="flex: 1; overflow-y: auto; margin-bottom: 0.5rem;"></div>
      <form id="chat-form" style="display: flex; gap: 0.5rem;">
        <input id="chat-input" type="text" placeholder="Type your message..." style="flex: 1; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        <button type="submit" style="padding: 0.5rem 1rem; background: black; color: white; border: none; border-radius: 4px;">Send</button>
      </form>
    `;

    const messagesDiv = chatWindow.querySelector("#chat-messages");
    const form = chatWindow.querySelector("#chat-form");
    const input = chatWindow.querySelector("#chat-input");

    button.addEventListener("click", () => {
      chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      messagesDiv.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
      input.value = "";

      try {
        const response = await fetch("https://campbell05.app.n8n.cloud/webhook/ce0eb04f-72fa-4669-b003-9ed24b237730/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "sendMessage",
            sessionId,
            chatInput: message,
          }),
        });

        const text = await response.text();
        const clean = text.trim();

        // Strip JSON if n8n accidentally returns a wrapped string
        const parsed = clean.startsWith("{") && clean.includes("output")
          ? (() => {
              try {
                const json = JSON.parse(clean);
                return json.output || clean;
              } catch {
                return clean;
              }
            })()
          : clean;

        messagesDiv.innerHTML += `<div><strong>Bot:</strong> ${parsed}</div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      } catch (err) {
        messagesDiv.innerHTML += `<div><em>Error talking to server</em></div>`;
      }
    });
  }
};