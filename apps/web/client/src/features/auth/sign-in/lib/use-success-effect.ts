import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { sessionQueryKey } from '$entities/session';

interface Props {
  success: boolean;
}

export function useSignInSuccessEffect({ success }: Props) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!success) {
      return;
    }

    void queryClient.invalidateQueries({
      queryKey: sessionQueryKey,
    });
  }, [success, queryClient]);
}
