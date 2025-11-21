import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/+$/,'');
if (import.meta.env.DEV) {
  console.info('[API] baseURL =', baseURL);
}

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Helper: lee personaId del JWT (o null)
export function getPersonaIdFromToken(): number | null {
  const t = localStorage.getItem('token');
  if (!t) return null;
  try {
    const payload = JSON.parse(atob(t.split('.')[1] ?? ''));
    return Number(payload.personaId ?? payload.sub ?? payload.id_persona ?? payload.id ?? null) || null;
  } catch {
    return null;
  }
}
