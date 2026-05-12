import { openapi } from '@elysia/openapi';
import 'dotenv/config';
import { Elysia } from 'elysia';

import organizationModule from '$modules/organization';
import { zodToOpenApiSchema } from '$shared/responses/api-openapi';

import authModule from './modules/auth';
import { LOG_EVENT } from './shared/logger/constant/log-event';
import { LOG_MESSAGE } from './shared/logger/constant/log-message';
import { logger } from './shared/logger/logger';

const app = new Elysia()
  .use(
    openapi({
      path: '/openapi',
      specPath: '/openapi/json',
      mapJsonSchema: {
        zod: zodToOpenApiSchema,
      },
      documentation: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: 'JWT access token',
            },
          },
        },
      },
    }),
  )
  .use(authModule)
  .use(organizationModule)
  .listen(process.env.APP_PORT ?? 3000);

if (app.server?.hostname && app.server.port) {
  logger.info(
    { event: LOG_EVENT.APP_START },
    `🦊 ${LOG_MESSAGE.APP_START} ${app.server.hostname}:${app.server.port.toString()}`,
  );
}
