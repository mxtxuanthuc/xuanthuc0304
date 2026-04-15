import { Router } from 'express';
import { ok } from '../../../common/http/envelope';
import { HealthService } from '../services/health.service';

export function buildHealthController(healthService: HealthService) {
  const router = Router();

  router.get('/health', (_req, res) => {
    return res.status(200).json(ok(healthService.getHealth()));
  });

  return router;
}
