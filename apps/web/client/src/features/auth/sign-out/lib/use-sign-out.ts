import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionQueryKey } from '$entities/session';
import { signOutAction } from '$features/auth/sign-out/api/sign-out-action';

export function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signOutAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: sessionQueryKey,
      });
    },
  });

  return mutation;
}
