export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  function generateSessionId() {
    return Math.random().toString(36).substring(2, 10);
  }

  try {
    const { chatInput, sessionId: incomingId } = req.body;
    const sessionId = incomingId || generateSessionId();  // Use existing or create new

    const response = await fetch("https://campbell05.app.n8n.cloud/webhook/ff370f0f-663b-41eb-9edd-dabb844716bf/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput, sessionId }),
    });

    const data = await response.json();
    res.status(200).json({ ...data, sessionId });  // Return sessionId for client to reuse
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}