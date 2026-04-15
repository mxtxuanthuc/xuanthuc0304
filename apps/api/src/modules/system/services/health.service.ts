export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
