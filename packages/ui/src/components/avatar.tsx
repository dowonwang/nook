'use client';

import Image from 'next/image';
import { createContext, useContext, useState } from 'react';

import { Button } from './button';
import { cn } from '../lib/cn';

import type { SetStateAction } from 'react';

interface AvatarState {
  error: boolean;
}

interface AvatarContext {
  value: AvatarState;
  setValue: React.Dispatch<SetStateAction<AvatarState>>;
}

const AvatarContext = createContext<AvatarContext | null>(null);

function useAvatarContext() {
  const context = useContext(AvatarContext);

  if (!context) {
    throw new Error('Avatar components must be used within <Avatar />');
  }

  return context;
}

export function Avatar({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [value, setValue] = useState<AvatarState>({
    error: false,
  });

  return (
    <AvatarContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      <Button
        variant='ghost'
        className={cn('gap-2 rounded-xl pr-3 pl-0', className)}
      >
        {children}
      </Button>
    </AvatarContext.Provider>
  );
}

export function AvatarFallBack({ children }: { children: React.ReactNode }) {
  const { value } = useAvatarContext();

  if (!value.error) return null;

  if (typeof children === 'string') {
    const text = children.slice(0, 1).toUpperCase();

    return (
      <div className='bg-primary text-primary-foreground flex aspect-square h-full items-center justify-center rounded-xl text-lg font-semibold'>
        {text}
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

export function AvatarImage({ alt, src }: { alt: string; src: string }) {
  const { value, setValue } = useAvatarContext();

  if (value.error) return null;

  const handleError = () => {
    setValue((old) => ({
      ...old,
      error: true,
    }));

    return;
  };

  return (
    <Image width={32} height={32} alt={alt} src={src} onError={handleError} />
  );
}

export function AvatarBody({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
