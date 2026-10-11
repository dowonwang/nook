import { z } from 'zod';

import {
  cursorPaginationResultSchema,
  offsetPaginationResultSchema,
  type PaginationType,
} from '$shared/pagination';

const defaultMetaSchema = z.object({
  unixTimestamp: z.number(),
  requestId: z.string().optional(),
});
const offsetMetaSchema = z.object({
  ...defaultMetaSchema.shape,
  pagination: offsetPaginationResultSchema,
});
const cursorMetaSchema = z.object({
  ...defaultMetaSchema.shape,
  pagination: cursorPaginationResultSchema,
});

export const ApiErrorDetailSchema = z.object({
  code: z.string(),
  details: z.unknown().optional(),
});

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  error: ApiErrorDetailSchema,
  meta: defaultMetaSchema,
});

export function createApiSuccessResponseSchema<T extends z.ZodType>(
  data: T,
  pagination: 'cursor',
): z.ZodObject<{
  success: z.ZodLiteral<true>;
  data: T;
  error: z.ZodNull;
  meta: typeof cursorMetaSchema;
}>;
export function createApiSuccessResponseSchema<T extends z.ZodType>(
  data: T,
  pagination: 'offset',
): z.ZodObject<{
  success: z.ZodLiteral<true>;
  data: T;
  error: z.ZodNull;
  meta: typeof offsetMetaSchema;
}>;
export function createApiSuccessResponseSchema<T extends z.ZodType>(
  data: T,
): z.ZodObject<{
  success: z.ZodLiteral<true>;
  data: T;
  error: z.ZodNull;
  meta: typeof defaultMetaSchema;
}>;
export function createApiSuccessResponseSchema<T extends z.ZodType>(
  data: T,
  pagination?: PaginationType,
) {
  if (pagination === 'cursor') {
    return z.object({
      success: z.literal(true),
      data,
      error: z.null(),
      meta: cursorMetaSchema,
    });
  }

  if (pagination === 'offset') {
    return z.object({
      success: z.literal(true),
      data,
      error: z.null(),
      meta: offsetMetaSchema,
    });
  }

  return z.object({
    success: z.literal(true),
    data,
    error: z.null(),
    meta: defaultMetaSchema,
  });
}

export type ApiResponseMeta<T extends PaginationType | undefined = undefined> =
  T extends 'cursor'
    ? z.infer<typeof cursorMetaSchema>
    : T extends 'offset'
      ? z.infer<typeof offsetMetaSchema>
      : z.infer<typeof defaultMetaSchema>;
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export interface ApiSuccessResponse<
  T,
  P extends PaginationType | undefined = undefined,
> {
  success: true;
  data: T;
  error: null;
  meta: ApiResponseMeta<P>;
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;
