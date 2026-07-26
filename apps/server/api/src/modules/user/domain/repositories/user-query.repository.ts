import type { User } from '../entities/user.entity';

export interface UserQueryRepository {
  findById(id: string): Promise<User | null>;
}
