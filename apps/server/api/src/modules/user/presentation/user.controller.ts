import { Elysia } from 'elysia';

export const createUserController = () => new Elysia({ prefix: '/users' });
