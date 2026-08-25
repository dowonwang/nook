import { z } from 'zod';

export const OrganizationHttpModel = {
  create: z.object({
    title: z.string().min(1).max(20),
  }),

  'create-invitation': z.object({
    email: z.email(),
    role: z.enum(['ADMIN', 'MAINTAINER', 'MEMBER']),
  }),

  'change-invitation-status': z.object({
    invitationId: z.uuidv7(),
    status: z.enum([
      'PENDING', // 초대 발송(대기중)
      'ACCEPTED', // 수락함 (즉시 조직 참여)
      'CANCELED', // 관리자가 초대 취소
      'REJECTED', // 사용자 초대 거절
    ]),
  }),
};

export type OrganizationHttpModel = {
  [K in keyof typeof OrganizationHttpModel]: z.infer<
    (typeof OrganizationHttpModel)[K]
  >;
};
