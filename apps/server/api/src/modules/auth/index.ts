import { prismaApiClient } from '@packages/api-db';
import 'dotenv/config';

import { PrismaUserCommandRepository } from '$modules/user/infrastructure';

import {
  RefreshTokenValidatorService,
  RefreshHandler,
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
  AuthTokenIssuerService,
  CredentialAuthenticatorService,
} from './application';
import {
  BcryptPasswordHasherAdapter,
  JwtTokenHasherAdapter,
  JwtTokenIssuerAdapter,
  JwtTokenVerifierAdapter,
  PrismaAuthSessionCommandRepository,
} from './infrastructure';
import { createAuthController, createAuthGuard } from './presentation';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);
const authSessionCommandRepository = new PrismaAuthSessionCommandRepository(
  prismaApiClient,
);

// service
const passwordHasher = new BcryptPasswordHasherAdapter();
const tokenVerifier = new JwtTokenVerifierAdapter(
  process.env.ACCESS_TOKEN_SECRET,
  process.env.REFRESH_TOKEN_SECRET,
);
const accessTokenIssuer = new JwtTokenIssuerAdapter(
  process.env.ACCESS_TOKEN_SECRET,
  process.env.ACCESS_TOKEN_EXPIRES,
);
const refreshTokenIssuer = new JwtTokenIssuerAdapter(
  process.env.REFRESH_TOKEN_SECRET,
  process.env.REFRESH_TOKEN_EXPIRES,
);
const tokenHasher = new JwtTokenHasherAdapter(process.env.HASH_TOKEN_SECRET);
const refreshTokenValidator = new RefreshTokenValidatorService(tokenHasher);
const authTokenIssuer = new AuthTokenIssuerService(
  accessTokenIssuer,
  refreshTokenIssuer,
  tokenHasher,
);
const credentialAuthenticator = new CredentialAuthenticatorService(
  userCommandRepository,
  passwordHasher,
);

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

// guard
export const authGuard = createAuthGuard(tokenVerifier);
export type { AuthGuard } from './presentation';

export default authModule;
