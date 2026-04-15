export interface JobPayload {
  jobId: string;
  dedupeKey: string;
  attempts: number;
}

export interface JobResult {
  success: boolean;
  error?: string;
}
