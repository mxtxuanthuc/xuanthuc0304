import { analyticsRollupsJob } from './analytics-rollups/analytics-rollups.job';
import { searchIndexingJob } from './search-indexing/search-indexing.job';
import { sendEmailJob } from './send-email/send-email.job';

async function bootstrapWorker() {
  await Promise.all([
    sendEmailJob({ jobId: 'job-1', dedupeKey: 'email:1', attempts: 1, to: 'candidate@example.com', template: 'welcome' }),
    searchIndexingJob({ jobId: 'job-2', dedupeKey: 'search:1', attempts: 1, index: 'users', documentId: 'user-1' }),
    analyticsRollupsJob({ jobId: 'job-3', dedupeKey: 'analytics:2026-04-15', attempts: 1, date: '2026-04-15' }),
  ]);
}

void bootstrapWorker();
