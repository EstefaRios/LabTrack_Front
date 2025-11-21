import { api } from './client';

type LoginDto = {
  tipo: string;            // 'CC', 'TI', etc.
  numero: string;          // documento
  fechaNacimiento: string; // 'YYYY-MM-DD'
};

export async function loginPaciente(dto: LoginDto) {
  const payload = {
    tipo: dto.tipo,
    numero: dto.numero,
    fechaNacimiento: dto.fechaNacimiento,
  };

  const start = Date.now();
  const budgetMs = 5 * 60 * 1000; // 5 minutos
  let attempt = 0;

  // Reintentos silenciosos hasta 5 minutos para permitir cold start de Render
  // Sin cambiar UI: el spinner existente seguirá mostrándose mientras se reintenta
  // Se corta sólo ante errores 4xx (credenciales/datos inválidos)
  // y se reintenta ante timeouts/red/5xx/429.
  // Nota: mantener sin logs visibles para el usuario.
  while (true) {
    try {
      const { data } = await api.post('/auth/login-paciente', payload);
      if (data?.access_token) {
        localStorage.setItem('token', data.access_token);
      }
      if (data?.personaId != null) {
        localStorage.setItem('personaId', String(data.personaId));
      }
      return data;
    } catch (err: any) {
      const status = err?.response?.status as number | undefined;
      const code = err?.code as string | undefined;
      const msg: string = (err?.message ?? '').toLowerCase();
      const isTimeout = code === 'ECONNABORTED' || msg.includes('timeout');
      const isNetwork = code === 'ERR_NETWORK' || (!err?.response && !err?.request);
      const isServer = status != null && status >= 500;
      const isTooManyReq = status === 429;

      const retryable = isTimeout || isNetwork || isServer || isTooManyReq;

      // Para errores de datos del usuario (4xx excepto 429), no reintentar
      if (!retryable) {
        throw err;
      }

      const elapsed = Date.now() - start;
      if (elapsed >= budgetMs) {
        const e = new Error('El servicio tardó en responder. Intenta iniciar sesión nuevamente en unos segundos.');
        (e as any).code = 'RENDER_COLD_START_TIMEOUT';
        throw e;
      }

      attempt++;
      const delay = Math.min(2000 * attempt, 8000);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('personaId');
}
