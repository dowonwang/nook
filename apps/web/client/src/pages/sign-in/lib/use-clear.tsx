'use server';

import { cookies } from 'next/headers';

// TODO: 쿠키 삭제 테스트용 간이 코드
export async function testClearCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('_flash_');
}
