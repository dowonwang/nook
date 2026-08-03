import type { UserLogEventMessage } from './user-log-event';

export const USER_LOG_MESSAGE: UserLogEventMessage = {
  USER_NOT_FOUND: 'User not found',
  USER_EMAIL_ALREADY_EXIST: 'User with this email already exists',
  USER_UUID_INVALID: 'User UUID is invaild',
  USER_PASSWORD_HASH_INVALID: 'User password hash is invaild',
  USER_TIMESTAMPS_REQUIRED:
    'UserDetailDto.fromEntity requires createdAt and updatedAt.',
  USER_INVALID_EMAIL: 'Invalid email address format',
  USER_INVALID_NAME: 'User name must be between 2 and 20 characters',
} as const;
