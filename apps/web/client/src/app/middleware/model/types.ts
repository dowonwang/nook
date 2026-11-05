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
    }
  | {
      // API 장애 등으로 세션을 확인하지 못함. 쿠키는 그대로 둠
      status: 'unavailable';
      response: NextResponse;
    };
