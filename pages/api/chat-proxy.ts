export default async function handler(req, res) {
  const { session_id } = req.query;

  const targetUrl = `https://campbell05.app.n8n.cloud/chatbot?session_id=${encodeURIComponent(session_id || "")}`;

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send("Failed to load chatbot iframe.");
  }
}