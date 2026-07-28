import { createHmac } from 'node:crypto';

function base64url(value: string | Buffer): string {
  return Buffer.from(value).toString('base64url');
}

export function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function signedValue(value: string, secret: string) {
  const encodedValue = base64url(value);
  const signature = sign(encodedValue, secret);

  return `${encodedValue}.${signature}`;
}
