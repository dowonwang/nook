export const USER_LOG_EVENT = {
  USER_NOT_FOUND: 'user_not_found',
  USER_UUID_INVALID: 'user_uuid_invalid',
  USER_PASSWORD_HASH_INVALID: 'user_password_hash_invalid',
  USER_TIMESTAMPS_REQUIRED: 'user_timestamps_required',
  USER_INVALID_EMAIL: 'user_invalid_email',
  USER_INVALID_NAME: 'user_invalid_name',
} as const;

export type UserLogEventMessage = Record<keyof typeof USER_LOG_EVENT, string>;
