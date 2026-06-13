import { pino } from 'pino';

import type { Logger } from 'pino';

const rootLogger = pino({
  level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'hostname',
            messageFormat: `[{scope}] {msg}`,
          },
        }
      : undefined,
}).child({ scope: 'APP' });

interface BaseLogContext {
  event?: string;
  scope?: string;
  requestId?: string;
  method?: string;
  path?: string;
  searchParams?: Record<string, string>;
  status?: number;
  userId?: string;
  details?: unknown;
  err?: unknown;
}

interface ScopedLogger {
  fatal: (context: BaseLogContext, message: string) => void;
  error: (context: BaseLogContext, message: string) => void;
  warn: (context: BaseLogContext, message: string) => void;
  info: (context: BaseLogContext, message: string) => void;
  debug: (context: BaseLogContext, message: string) => void;
  trace: (context: BaseLogContext, message: string) => void;
  silent: (context: BaseLogContext, message: string) => void;
}

const createScopedLogger = (logger: Logger): ScopedLogger => ({
  fatal: (context, message) => {
    logger.fatal(context, message);
  },
  error: (context, message) => {
    logger.error(context, message);
  },
  warn: (context, message) => {
    logger.warn(context, message);
  },
  info: (context, message) => {
    logger.info(context, message);
  },
  debug: (context, message) => {
    logger.debug(context, message);
  },
  trace: (context, message) => {
    logger.trace(context, message);
  },
  silent: (context, message) => {
    logger.silent(context, message);
  },
});

export const logger = createScopedLogger(rootLogger);

export const createLogger = (scope: string): ScopedLogger => {
  return createScopedLogger(rootLogger.child({ scope }));
};
