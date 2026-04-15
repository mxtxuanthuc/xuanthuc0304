export class PresenceService {
  private readonly onlineUserIds = new Set<string>();

  markOnline(userId: string) {
    this.onlineUserIds.add(userId);
  }

  markOffline(userId: string) {
    this.onlineUserIds.delete(userId);
  }

  isOnline(userId: string) {
    return this.onlineUserIds.has(userId);
  }
}
