import en from './en.json';

import type { DeepStringify } from '$shared/i18n';
import type ko from './ko.json';

type I18nKey = DeepStringify<typeof ko>;

en satisfies I18nKey;

export const FEAT_ORGANIZATION_MY_LIST_I18N_NAMESPACE =
  'features/organization/my-list';
