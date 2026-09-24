import en from './en.json';

import type { DeepStringify } from '$shared/i18n';
import type ko from './ko.json';

export type I18nKey = DeepStringify<typeof ko>;

en satisfies I18nKey;

export const SESSION_REQUIRED_SIGN_IN: keyof I18nKey = 'required_sign_in';
export const ENTITY_SESSION_I18N_NAMESPACE = 'entities/session';
