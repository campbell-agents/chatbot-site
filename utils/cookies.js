export function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export function getSessionCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/sessionId=([^;]+)/);
  return match ? match[1] : null;
}

export function setSessionCookie(id) {
  if (typeof document === "undefined") return;
  document.cookie = `sessionId=${id}; path=/; max-age=31536000`;
}