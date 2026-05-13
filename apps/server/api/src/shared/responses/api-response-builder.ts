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

export const ApiResponseBuilder = {
  success<T>(data: T, requestId?: string): ApiSuccessResponse<T> {
    return {
      success: true,
      data,
      error: null,
      meta: createMeta(requestId),
    };
  },

  error({
    message,
    requestId,
    userMessage,
    details,
  }: ApiErrorDetail & {
    requestId: ApiResponseMeta['requestId'];
  }): ApiErrorResponse {
    return {
      success: false,
      data: null,
      error: {
        message,
        ...(userMessage !== undefined ? { userMessage } : {}),
        ...(details !== undefined ? { details } : {}),
      },
      meta: createMeta(requestId),
    };
  },
};
