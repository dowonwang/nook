import { createHmac, timingSafeEqual } from 'node:crypto';

function base64url(value: string | Buffer): string {
  return Buffer.from(value).toString('base64url');
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function signedCookie(value: string, secret: string) {
  const encodedValue = base64url(value);
  const signature = sign(encodedValue, secret);

  return `${encodedValue}.${signature}`;
}

export function verifySignedCookie(
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
