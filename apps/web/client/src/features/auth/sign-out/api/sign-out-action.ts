'use client';

export async function signOutAction() {
  await fetch('/api/auth/sign-out', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });
}
