'use client';

import { useConsumeFlashCookie } from '$shared/cookie';

interface Props {
  shouldConsume: boolean;
}

export function FlashCookieConsumer({ shouldConsume }: Props) {
  useConsumeFlashCookie(shouldConsume);

  return null;
}
