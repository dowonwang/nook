export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthenticatedSession {
  authenticated: true;
  user: SessionUser;
}

export interface UnauthenticatedSession {
  authenticated: false;
  user: null;
}

export type Session = AuthenticatedSession | UnauthenticatedSession;
