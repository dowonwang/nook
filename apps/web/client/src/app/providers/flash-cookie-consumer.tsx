'use client';
import { useConsumeFlashCookie } from '$shared/lib/cookie';

interface Props {
  shouldConsume: boolean;
}

export function FlashCookieConsumer({ shouldConsume }: Props) {
  useConsumeFlashCookie(shouldConsume);

  return null;
}
