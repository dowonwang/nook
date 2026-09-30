import en from './en.json';

import type { DeepStringify } from '$shared/i18n';
import type ko from './ko.json';

type I18nKey = DeepStringify<typeof ko>;

en satisfies I18nKey;

export const PAGES_ORGANIZATION_HOME_I18N_NAMESPACE = 'pages/organization/home';
