import type { I18N_RESPONSE_KEY } from '../../response';

export const i18nResponseKo = {
  'common.error.BadRequestError': '잘못된 요청입니다.',
  'common.error.UnauthorizedError': '사용자 인증이 필요한 서비스입니다.',
  'common.error.ForbiddenError': '접근 권한이 없습니다.',
  'common.error.NotFoundError': '요청한 리소를 찾을 수 없습니다.',
  'common.error.ConflictError': '이미 존재하는 데이터입니다.',
  'common.error.UnprocessableContent': '입력한 정보가 올바르지 않습니다.',
  'common.error.InternalServerError': '일시적인 오류가 발생했습니다.',

  'auth.error.InvalidUserUUID': '계정 정보가 유효하지 않습니다.',
  'auth.error.EmailAlreadyExists': '',
} satisfies Record<I18N_RESPONSE_KEY, string>;
