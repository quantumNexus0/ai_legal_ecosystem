const placeholder = '__VITE_API_URL__';
const fallback = 'http://localhost:8000';
const BASE_URL = (placeholder.includes('__VITE_API_URL__') ? fallback : placeholder);

export async function askAI(message: any) {
  const res = await fetch(`${BASE_URL}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.json();
}
