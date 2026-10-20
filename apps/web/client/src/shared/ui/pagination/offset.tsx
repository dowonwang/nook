'use client';

import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface Props {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}

export function OffsetPagination({ page, totalPages, hasNextPage }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const items = getPaginationItems(page, totalPages);
  const hasPrevPage = page > 1;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleNextPage = () => {
    if (pathname && hasNextPage) {
      router.push(pathname + '?' + createQueryString('page', String(page + 1)));
    }
  };

  const handlePrevPage = () => {
    if (pathname && hasPrevPage) {
      router.push(pathname + '?' + createQueryString('page', String(page - 1)));
    }
  };

  const handlePage = (target: number) => {
    if (pathname) {
      router.push(pathname + '?' + createQueryString('page', String(target)));
    }
  };

  return (
    <nav
      aria-label='pagination'
      className='flex items-center justify-center gap-3'
    >
      <button
        className={clsx(
          'bg-card text-secondary-foreground rounded-xl p-1 shadow',
          {
            'cursor-not-allowed': !hasPrevPage,
          },
        )}
        onClick={handlePrevPage}
        disabled={!hasPrevPage}
      >
        <ChevronLeft className='h-8 w-8' />
      </button>

      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <Ellipsis
            key={`ellipsis-${String(items[index - 1])}`}
            className='text-secondary-foreground h-6 w-6'
          />
        ) : (
          <button
            key={item}
            className={clsx('min-h-10 min-w-10 rounded-xl p-1 shadow', {
              'bg-primary text-primary-foreground text-base font-black':
                item === page,

              'bg-card text-sm font-semibold': item !== page,
            })}
            onClick={() => {
              handlePage(item);
            }}
          >
            {item}
          </button>
        ),
      )}

      <button
        className={clsx(
          'bg-card text-secondary-foreground rounded-xl p-1 shadow',
          {
            'cursor-not-allowed': !hasNextPage,
          },
        )}
        onClick={handleNextPage}
        disabled={!hasNextPage}
      >
        <ChevronRight className={clsx('h-8 w-8')} />
      </button>
    </nav>
  );
}

const getPaginationItems = (page: number, totalPages: number) => {
  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i == 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    }
  }

  const items: (number | 'ellipsis')[] = [];

  pages.forEach((value, index) => {
    if (index > 0 && value - pages[index - 1] > 1) {
      items.push('ellipsis');
    }

    items.push(value);
  });

  return items;
};
