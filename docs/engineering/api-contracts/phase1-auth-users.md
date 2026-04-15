# Phase 1 API Contracts (Auth + Users)

## POST /api/v1/auth/register
- Request: `{ email, password, role }`
- Response envelope includes `user`, `tokens`, and emitted events metadata.

## POST /api/v1/auth/login
- Request: `{ email, password }`
- Response envelope includes access/refresh tokens and auth login events metadata.

## POST /api/v1/users
- Request: `{ email, password, role }`
- Response returns normalized user output.

All responses follow:
```json
{ "success": true, "data": {}, "message": "optional", "meta": {} }
```
