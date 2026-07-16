'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { sessionQueryKey } from '$entities/session';
import { signOutAction } from '$features/auth/sign-out/api/sign-out-action';

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signOutAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: sessionQueryKey,
      });

      router.replace('/');
    },
  });

  return mutation;
}
