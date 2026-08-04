import { openapi } from '@elysia/openapi';
import 'dotenv/config';
import { Elysia } from 'elysia';

import authModule from '$modules/auth';
import organizationModule from '$modules/organization';
import userModule from '$modules/user';
import { errorPlugin } from '$shared/http';
import { LOG_EVENT, LOG_MESSAGE, logger } from '$shared/logger';
import { zodToOpenApiSchema } from '$shared/responses';

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
  .use(errorPlugin)
  .use(authModule)
  .use(organizationModule)
  .use(userModule)
  .listen(process.env.APP_PORT ?? 3000);

if (app.server?.hostname && app.server.port) {
  logger.info(
    { event: LOG_EVENT.APP_START },
    `🦊 ${LOG_MESSAGE.APP_START} ${app.server.hostname}:${app.server.port.toString()}`,
  );
}
