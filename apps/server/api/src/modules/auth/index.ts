import { prismaApiClient } from '@packages/api-db';
import 'dotenv/config';

import { PrismaUserCommandRepository } from '$modules/user/infrastructure/repositories/prisma-user-command.repository';
import { PrismaUserQueryRepository } from '$modules/user/infrastructure/repositories/prisma-user-query.repository';

import { SignInHandler } from './application/commands/sign-in/sign-in.handler';
import { SignUpHandler } from './application/commands/sign-up/sign-up.handler';
import { MeHandler } from './application/queries/me/me.handler';
import { createAuthGuard } from './infrastructure/guard/auth.guard';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher';
import { JwtTokenIssuer } from './infrastructure/services/jwt-token-issuer';
import { JwtTokenVerifier } from './infrastructure/services/jwt-token-verifier';
import { createAuthController } from './presentation/auth.controller';

// repository
const userCommandRepository = new PrismaUserCommandRepository(prismaApiClient);
const userQueryRepository = new PrismaUserQueryRepository(prismaApiClient);

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

// guard
export const authGuard = createAuthGuard(tokenVerifier);

// handler
const signUpHandler = new SignUpHandler(userCommandRepository, passwordHasher);
const signInHandler = new SignInHandler(
  userCommandRepository,
  passwordHasher,
  accessTokenIssuer,
  refreshTokenIssuer,
);
const meHandler = new MeHandler(userQueryRepository);

const authModule = createAuthController({
  signUpHandler,
  signInHandler,
  meHandler,
});

export default authModule;
