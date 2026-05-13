import { z } from 'zod';

export const ApiResponseMetaSchema = z.object({
  unixTimestamp: z.number(),
  requestId: z.string().optional(),
});

export const ApiErrorDetailSchema = z.object({
  message: z.string(),
  userMessage: z.string().optional(),
  details: z.unknown().optional(),
});

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  error: ApiErrorDetailSchema,
  meta: ApiResponseMetaSchema,
});

export function createApiSuccessResponseSchema<T extends z.ZodType>(data: T) {
  return z.object({
    success: z.literal(true),
    data,
    error: z.null(),
    meta: ApiResponseMetaSchema,
  });
}

export type ApiResponseMeta = z.infer<typeof ApiResponseMetaSchema>;
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  error: null;
  meta: ApiResponseMeta;
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;
