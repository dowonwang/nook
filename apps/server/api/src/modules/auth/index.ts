import { prismaApiClient } from '@packages/api-db';
import 'dotenv/config';

import {
  PrismaUserCommandRepository,
  PrismaUserQueryRepository,
} from '$modules/user/infrastructure';

import {
  MeHandler,
  RefreshTokenValidator,
  RefreshHandler,
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
  TokenRotationService,
} from './application';
import {
  BcryptPasswordHasher,
  createAuthGuard,
  JwtTokenHasher,
  JwtTokenIssuer,
  JwtTokenVerifier,
  PrismaAuthSessionCommandRepository,
} from './infrastructure';
import { createAuthController } from './presentation';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);
const userQueryRepository = new PrismaUserQueryRepository(prismaApiClient);
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
const tokenRotation = new TokenRotationService(
  accessTokenIssuer,
  refreshTokenIssuer,
  tokenHasher,
);

// guard
export const authGuard = createAuthGuard(tokenVerifier);

// handler
const signUpHandler = new SignUpHandler(userCommandRepository, passwordHasher);
const signInHandler = new SignInHandler(
  userCommandRepository,
  authSessionCommandRepository,
  passwordHasher,
  accessTokenIssuer,
  refreshTokenIssuer,
  tokenHasher,
);
const meHandler = new MeHandler(userQueryRepository);
const refreshHandler = new RefreshHandler(
  authSessionCommandRepository,
  userCommandRepository,
  refreshTokenValidator,
  tokenRotation,
  tokenVerifier,
);
const signOutHandler = new SignOutHandler(
  authSessionCommandRepository,
  tokenVerifier,
);

const authModule = createAuthController({
  signUpHandler,
  signInHandler,
  meHandler,
  refreshHandler,
  signOutHandler,
  authGuard,
});

export default authModule;
