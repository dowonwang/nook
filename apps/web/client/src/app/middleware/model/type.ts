import type { NextResponse } from 'next/server';

export type RouteScope = 'public' | 'private';

export type HandleSessionResult =
  | {
      status: 'valid';
      response: NextResponse;
    }
  | {
      status: 'anonymous';
      response: NextResponse;
    }
  | {
      status: 'invalid';
    };
