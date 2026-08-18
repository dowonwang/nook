import type { User } from '../entities/user.entity';
import type { UserEmail, UserUuid } from '../value-objects';

export interface UserQueryRepository {
  findById(id: UserUuid): Promise<User | null>;
  findManyByIds(id: UserUuid[]): Promise<User[]>;
  findByEmail(email: UserEmail): Promise<User | null>;
}
