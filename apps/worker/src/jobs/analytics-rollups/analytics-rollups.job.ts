import type { JobPayload, JobResult } from '../job.types';

export async function analyticsRollupsJob(payload: JobPayload & { date: string }): Promise<JobResult> {
  if (!payload.date) {
    return { success: false, error: 'Date is required.' };
  }

  return { success: true };
}
