import type { JobPayload, JobResult } from '../job.types';

export async function searchIndexingJob(payload: JobPayload & { index: string; documentId: string }): Promise<JobResult> {
  if (!payload.index || !payload.documentId) {
    return { success: false, error: 'Invalid indexing payload.' };
  }

  return { success: true };
}
