export function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() || realIp || null;
}
