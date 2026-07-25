import { prismaApiClient } from '@packages/api-db';
import 'dotenv/config';

import {
  PrismaUserCommandRepository,
  PrismaUserQueryRepository,
} from '$modules/user/infrastructure';

import {
  MeHandler,
  RefreshHandler,
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
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
const tokenHasher = new JwtTokenHasher();

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
  accessTokenIssuer,
  refreshTokenIssuer,
  tokenVerifier,
  tokenHasher,
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
