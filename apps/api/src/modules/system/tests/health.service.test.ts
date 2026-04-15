import assert from 'node:assert/strict';
import test from 'node:test';
import { HealthService } from '../services/health.service';

test('HealthService returns ok status', () => {
  const health = new HealthService().getHealth();
  assert.equal(health.status, 'ok');
});
