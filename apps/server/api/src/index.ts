import 'dotenv/config';
import { Elysia } from 'elysia';

import authModule from './modules/auth';
import { LOG_EVENT } from './shared/logger/constant/log-event';
import { LOG_MESSAGE } from './shared/logger/constant/log-message';
import { logger } from './shared/logger/logger';

const app = new Elysia().use(authModule).listen(process.env.APP_PORT ?? 3000);

if (app.server?.hostname && app.server.port) {
  logger.info(
    { event: LOG_EVENT.APP_START },
    `🦊 ${LOG_MESSAGE.APP_START} ${app.server.hostname}:${app.server.port.toString()}`,
  );
}
