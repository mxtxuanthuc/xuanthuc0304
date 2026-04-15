import assert from 'node:assert/strict';
import test from 'node:test';
import { sendEmailJob } from '../jobs/send-email/send-email.job';

test('sendEmailJob returns success for valid payload', async () => {
  const result = await sendEmailJob({
    jobId: 'job-1',
    dedupeKey: 'email:1',
    attempts: 1,
    to: 'test@example.com',
    template: 'welcome',
  });

  assert.equal(result.success, true);
});
