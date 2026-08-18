import type { UserLogEventMessage } from './user-log-event';

export const USER_LOG_MESSAGE: UserLogEventMessage = {
  USER_NOT_FOUND: 'User not found',
  USER_UUID_INVALID: 'User UUID is invalid',
  USER_PASSWORD_HASH_INVALID: 'User password hash is invalid',
  USER_TIMESTAMPS_REQUIRED:
    'UserDetailDto.fromEntity requires createdAt and updatedAt.',
  USER_INVALID_EMAIL: 'Invalid email address format',
  USER_INVALID_NAME: 'User name must be between 2 and 20 characters',
} as const;
