export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Career Platform API',
    version: '1.0.0',
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check endpoint',
      },
    },
  },
};
