import type {
  CursorPaginationResult,
  OffsetPaginationResult,
} from '$shared/pagination';
import type {
  ApiErrorDetail,
  ApiErrorResponse,
  ApiResponseMeta,
  ApiSuccessResponse,
} from './api-response';

const createMeta = (
  requestId?: ApiResponseMeta['requestId'],
): ApiResponseMeta => ({
  unixTimestamp: new Date().getTime(),
  ...(requestId ? { requestId } : {}),
});

function success<T>(
  data: T,
  options: {
    requestId?: string;
    pagination: OffsetPaginationResult;
  },
): ApiSuccessResponse<T, 'offset'>;
function success<T>(
  data: T,
  options: {
    requestId?: string;
    pagination: CursorPaginationResult;
  },
): ApiSuccessResponse<T, 'cursor'>;
function success<T>(
  data: T,
  options?: {
    requestId?: string;
  },
): ApiSuccessResponse<T>;
function success<T>(
  data: T,
  options?: {
    requestId?: string;
    pagination?: CursorPaginationResult | OffsetPaginationResult;
  },
) {
  return {
    success: true,
    data,
    error: null,
    meta: {
      ...createMeta(options?.requestId),
      ...(options?.pagination ? { pagination: options.pagination } : {}),
    },
  };
}

export const ApiResponseBuilder = {
  success,
  error({
    code,
    requestId,
    details,
  }: ApiErrorDetail & {
    requestId: ApiResponseMeta['requestId'];
  }): ApiErrorResponse {
    return {
      success: false,
      data: null,
      error: {
        code,
        ...(details !== undefined ? { details } : {}),
      },
      meta: createMeta(requestId),
    };
  },
};
