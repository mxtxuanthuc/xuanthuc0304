import { createHash, randomUUID } from 'node:crypto';
import type { SessionEntity } from '../entities/session.entity';

export class SessionsRepository {
  private readonly sessions = new Map<string, SessionEntity>();

  async create(userId: string, refreshToken: string, ttlDays: number): Promise<SessionEntity> {
    const now = new Date();
    const session: SessionEntity = {
      id: randomUUID(),
      userId,
      refreshTokenHash: createHash('sha256').update(refreshToken).digest('hex'),
      createdAt: now,
      expiresAt: new Date(now.getTime() + ttlDays * 24 * 60 * 60 * 1000),
      revokedAt: null,
    };

    this.sessions.set(session.id, session);
    return session;
  }
}
