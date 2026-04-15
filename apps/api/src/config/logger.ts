export interface LogMeta {
  [key: string]: unknown;
}

export function logInfo(message: string, meta: LogMeta = {}) {
  console.info(JSON.stringify({ level: 'info', message, ...meta, ts: new Date().toISOString() }));
}

export function logError(message: string, meta: LogMeta = {}) {
  console.error(JSON.stringify({ level: 'error', message, ...meta, ts: new Date().toISOString() }));
}
