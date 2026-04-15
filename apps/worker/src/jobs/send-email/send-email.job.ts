import type { JobPayload, JobResult } from '../job.types';

export async function sendEmailJob(payload: JobPayload & { to: string; template: string }): Promise<JobResult> {
  if (!payload.to || !payload.template) {
    return { success: false, error: 'Invalid email payload.' };
  }

  return { success: true };
}
