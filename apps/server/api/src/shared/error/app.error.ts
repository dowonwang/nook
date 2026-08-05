import type { I18N_RESPONSE_KEY } from '@packages/i18n/response';

interface AppErrorOptions {
  event: string;
  status: number;
  message: string;
  code: I18N_RESPONSE_KEY;
  details?: unknown;
  cause?: unknown;
  scope?: string;
}

export class AppError extends Error {
  public readonly status: number;
  public readonly code: I18N_RESPONSE_KEY;
  public readonly details?: unknown;
  public readonly event?: string;
  public readonly scope?: string;
  public override readonly cause?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);

    this.name = this.constructor.name;
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
    this.event = options.event;
    this.scope = options.scope;
    this.cause = options.cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
