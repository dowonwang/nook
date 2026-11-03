'use client';

import {
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
} from '@packages/ui/components/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface Props {
  total: number;
}

export function PaginationLimitSelector({ total }: Props) {
  const searchParams = useSearchParams();
  const limit = searchParams?.get('limit') || '10';
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleClick = (value: string) => {
    if (pathname) {
      router.push(pathname + '?' + createQueryString('limit', value));
    }
  };

  if (total < 10) {
    return null;
  }

  return (
    <Select value={limit} onValueChange={handleClick} className='ml-auto'>
      <SelectInput name='limit' />

      <SelectTrigger />
      <SelectContent>
        <SelectItem value='10'>10</SelectItem>
        <SelectItem value='20'>20</SelectItem>
        <SelectItem value='30'>30</SelectItem>
        <SelectItem value='50'>50</SelectItem>
        <SelectItem value='100'>100</SelectItem>
      </SelectContent>
    </Select>
  );
}
