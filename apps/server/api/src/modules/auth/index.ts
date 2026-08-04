import { prismaApiClient } from '@packages/api-db';
import 'dotenv/config';

import { PrismaUserCommandRepository } from '$modules/user/infrastructure';

import {
  RefreshTokenValidator,
  RefreshHandler,
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
  AuthTokenIssuer,
  CredentialAuthenticator,
} from './application';
import {
  BcryptPasswordHasher,
  JwtTokenHasher,
  JwtTokenIssuer,
  JwtTokenVerifier,
  PrismaAuthSessionCommandRepository,
} from './infrastructure';
import { createAuthController } from './presentation';
import { createAuthGuard } from './presentation/guard/auth.guard';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);
const authSessionCommandRepository = new PrismaAuthSessionCommandRepository(
  prismaApiClient,
);

// service
const passwordHasher = new BcryptPasswordHasher();
const tokenVerifier = new JwtTokenVerifier(
  process.env.ACCESS_TOKEN_SECRET,
  process.env.REFRESH_TOKEN_SECRET,
);
const accessTokenIssuer = new JwtTokenIssuer(
  process.env.ACCESS_TOKEN_SECRET,
  process.env.ACCESS_TOKEN_EXPIRES,
);
const refreshTokenIssuer = new JwtTokenIssuer(
  process.env.REFRESH_TOKEN_SECRET,
  process.env.REFRESH_TOKEN_EXPIRES,
);
const tokenHasher = new JwtTokenHasher(process.env.HASH_TOKEN_SECRET);
const refreshTokenValidator = new RefreshTokenValidator(tokenHasher);
const authTokenIssuer = new AuthTokenIssuer(
  accessTokenIssuer,
  refreshTokenIssuer,
  tokenHasher,
);
const credentialAuthenticator = new CredentialAuthenticator(
  userCommandRepository,
  passwordHasher,
);

// guard
export const authGuard = createAuthGuard(tokenVerifier);
export type AuthGuard = ReturnType<typeof createAuthGuard>;

// handler
const signUpHandler = new SignUpHandler(userCommandRepository, passwordHasher);
const signInHandler = new SignInHandler(
  authSessionCommandRepository,
  credentialAuthenticator,
  authTokenIssuer,
);
const refreshHandler = new RefreshHandler(
  authSessionCommandRepository,
  userCommandRepository,
  refreshTokenValidator,
  authTokenIssuer,
  tokenVerifier,
);
const signOutHandler = new SignOutHandler(
  authSessionCommandRepository,
  tokenVerifier,
);

const authModule = createAuthController({
  signUpHandler,
  signInHandler,
  refreshHandler,
  signOutHandler,
});

export default authModule;
