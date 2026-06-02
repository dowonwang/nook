export interface ValidationFieldError {
  path: string;
  message: string;
}

export interface ApiValidationErrorResponse {
  error: {
    message: string;
    details: ValidationFieldError[];
  };
}

export const ValidationErrorCode = 'VALIDATION_ERROR';

export class ApiValidationError extends Error {
  readonly code = ValidationErrorCode;
  readonly status: number;
  readonly details: ValidationFieldError[];
  constructor(input: {
    status: number;
    details: ValidationFieldError[];
    message?: string;
  }) {
    super(input.message ?? 'Validation Error');

    this.name = 'ApiValidationError';
    this.status = input.status;
    this.details = input.details;
  }
}

export function isApiValidationErrorResponse(
  value: unknown,
): value is ApiValidationErrorResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<ApiValidationErrorResponse>;
  const errorObj = candidate.error;

  if (!errorObj || typeof errorObj !== 'object') {
    return false;
  }

  if (typeof errorObj.message !== 'string') {
    return false;
  }

  if (!Array.isArray(errorObj.details)) {
    return false;
  }

  return errorObj.details.every((item) => {
    return (
      typeof item === 'object' &&
      typeof item.path === 'string' &&
      typeof item.message === 'string'
    );
  });
}
