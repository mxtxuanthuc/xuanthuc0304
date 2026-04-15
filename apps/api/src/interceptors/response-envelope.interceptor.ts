import type { NextFunction, Request, Response } from 'express';

export function responseEnvelopeInterceptor(_req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json.bind(res);

  res.json = (body: unknown) => {
    if (body && typeof body === 'object' && 'success' in (body as Record<string, unknown>)) {
      return originalJson(body);
    }

    return originalJson({
      success: true,
      data: body,
    });
  };

  next();
}
