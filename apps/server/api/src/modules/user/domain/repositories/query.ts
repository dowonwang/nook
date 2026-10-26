import type { UserEntity } from '../entities/user';
import type { UserEmailVo, UserUuidVo } from '../value-objects';

export interface UserQueryRepository {
  findById(id: UserUuidVo): Promise<UserEntity | null>;
  findManyByIds(id: UserUuidVo[]): Promise<UserEntity[]>;
  findByEmail(email: UserEmailVo): Promise<UserEntity | null>;
}
