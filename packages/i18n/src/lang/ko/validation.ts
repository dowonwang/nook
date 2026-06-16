import type { I18N_VALIDATION_KEY } from '../../validation';

export const i18ValidationKo = {
  'validation.PostAuthSignInBody.email.regex': '',
  'validation.PostAuthSignInBody.email.string': '',
  'validation.PostAuthSignInBody.password.string': '',

  'validation.PostAuthSignUpBody.email.regex': '',
  'validation.PostAuthSignUpBody.email.string': '',
  'validation.PostAuthSignUpBody.name.max': '',
  'validation.PostAuthSignUpBody.name.min': '',
  'validation.PostAuthSignUpBody.name.string': '',
  'validation.PostAuthSignUpBody.password.string': '',

  'validation.PostOrganizationAddMembersBody.members.role.enum': '',
  'validation.PostOrganizationAddMembersBody.members.userId.regex': '',
  'validation.PostOrganizationAddMembersBody.members.userId.uuid': '',
  'validation.PostOrganizationAddMembersBody.organizationId.regex': '',
  'validation.PostOrganizationAddMembersBody.organizationId.uuid': '',

  'validation.PostOrganizationBody.title.string': '',
} satisfies Record<I18N_VALIDATION_KEY, string>;
