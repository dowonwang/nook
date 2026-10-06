import { timingSafeEqual } from 'node:crypto';

import { sign } from './sign-value';

export function verifySignedValue(
  cookieValue: string,
  secret: string,
): string | null {
  const dotIndex = cookieValue.lastIndexOf('.');

  if (dotIndex === -1) {
    return null;
  }

  const encodedValue = cookieValue.slice(0, dotIndex);
  const receivedSignature = cookieValue.slice(dotIndex + 1);
  const expectedSignature = sign(encodedValue, secret);

  let receivedBuffer: Buffer;
  let expectedBuffer: Buffer;

  try {
    receivedBuffer = Buffer.from(receivedSignature, 'base64url');
    expectedBuffer = Buffer.from(expectedSignature, 'base64url');
  } catch {
    return null;
  }

  if (receivedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(receivedBuffer, expectedBuffer)) {
    return null;
  }

  try {
    return Buffer.from(encodedValue, 'base64url').toString('utf8');
  } catch {
    return null;
  }
}
