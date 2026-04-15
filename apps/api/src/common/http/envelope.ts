export interface SuccessEnvelope<T> {
  success: true;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  request_id?: string;
}

export function ok<T>(data: T, message?: string, meta?: Record<string, unknown>): SuccessEnvelope<T> {
  return {
    success: true,
    message,
    data,
    meta,
  };
}
