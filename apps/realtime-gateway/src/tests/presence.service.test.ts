import assert from 'node:assert/strict';
import test from 'node:test';
import { PresenceService } from '../presence/presence.service';

test('PresenceService tracks online users', () => {
  const presence = new PresenceService();
  presence.markOnline('u1');
  assert.equal(presence.isOnline('u1'), true);
  presence.markOffline('u1');
  assert.equal(presence.isOnline('u1'), false);
});
