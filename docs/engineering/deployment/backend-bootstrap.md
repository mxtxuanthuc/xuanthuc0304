# Backend Bootstrap Deployment Notes

- `apps/api` is the modular monolith API entrypoint.
- `apps/realtime-gateway` is deployed separately for websocket connections.
- `apps/worker` runs async jobs and event consumers.
- All write operations should remain source-of-truth in `apps/api` + PostgreSQL.
