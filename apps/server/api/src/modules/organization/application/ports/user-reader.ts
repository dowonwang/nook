import type { UserUuidVo } from '$modules/user/domain';

// 모듈 간 FK가 없으므로, 다른 모듈의 사용자를 참조하기 전에 존재 여부를 이 포트로 확인
export interface OrganizationUserReaderPort {
  existsById(userId: UserUuidVo): Promise<boolean>;
}
