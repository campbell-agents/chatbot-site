// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { action, chatInput, sessionId } = req.body;
  try {
    // forward into your n8n webhook
    const n8nRes = await fetch(
      'https://campbell05.app.n8n.cloud/webhook/ff370f0f-663b-41eb-9edd-dabb844716bf/chat',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, chatInput, sessionId }),
      }
    );
    const data = await n8nRes.json();
    // expect { response: "…" } from n8n
    return res.status(200).json({ response: data.response });
  } catch (err) {
    console.error('API chat error', err);
    return res.status(500).json({ response: 'Internal Server Error' });
  }
}