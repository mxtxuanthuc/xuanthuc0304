import express from 'express';
import { loadEnv } from './config/env';
import { logInfo } from './config/logger';
import { requestIdMiddleware } from './middleware/request-id.middleware';
import { responseEnvelopeInterceptor } from './interceptors/response-envelope.interceptor';
import { httpExceptionFilter } from './filters/http-exception.filter';
import { buildHealthController } from './modules/system/controllers/health.controller';
import { HealthService } from './modules/system/services/health.service';
import { buildUsersController } from './modules/users/controllers/users.controller';
import { UsersRepository } from './modules/users/repositories/users.repository';
import { UsersService } from './modules/users/services/users.service';
import { buildAuthController } from './modules/auth/controllers/auth.controller';
import { SessionsRepository } from './modules/auth/repositories/sessions.repository';
import { AuthService } from './modules/auth/services/auth.service';
import { openApiSpec } from './docs/openapi';

const env = loadEnv();
const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(requestIdMiddleware);
app.use(responseEnvelopeInterceptor);

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const authService = new AuthService(usersService, usersRepository, new SessionsRepository());

app.use('/api/v1', buildHealthController(new HealthService()));
app.use('/api/v1/users', buildUsersController(usersService));
app.use('/api/v1/auth', buildAuthController(authService));
app.get('/api/v1/docs/openapi.json', (_req, res) => res.status(200).json(openApiSpec));

app.use(httpExceptionFilter);

app.listen(env.PORT, () => {
  logInfo('API server started', { port: env.PORT, env: env.NODE_ENV });
});
