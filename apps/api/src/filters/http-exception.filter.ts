import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../common/errors/app-error';
import { logError } from '../config/logger';

export function httpExceptionFilter(error: unknown, req: Request, res: Response, _next: NextFunction) {
  const requestId = req.header('x-request-id');

  if (error instanceof AppError) {
    logError(error.message, { code: error.code, requestId, details: error.details });
    return res.status(error.status).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      request_id: requestId,
    });
  }

  logError('Unhandled error', { requestId, error });
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unexpected server error.',
    },
    request_id: requestId,
  });
}
