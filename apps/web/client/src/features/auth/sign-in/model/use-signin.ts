import { usePostAuthSignIn } from '@packages/api-client/generated/auth/auth.js';

export function useSignIn() {
  return usePostAuthSignIn({
    mutation: {
      onSuccess: (res) => {
        console.log(res);
      },
    },
  });
}
