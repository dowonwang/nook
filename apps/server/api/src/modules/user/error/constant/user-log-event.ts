export const USER_LOG_EVENT = {
  USER_NOT_FOUND: 'user.not_found',
  USER_UUID_INVALID: 'user.uuid_invalid',
  USER_PASSWORD_HASH_INVALID: 'user.password_hash_invalid',
  USER_TIMESTAMPS_REQUIRED: 'user.timestamps_required',
  USER_INVALID_EMAIL: 'user.invalid_email',
  USER_INVALID_NAME: 'user.invalid_name',
} as const;

export type UserLogEventMessage = Record<keyof typeof USER_LOG_EVENT, string>;
