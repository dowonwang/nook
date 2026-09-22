import en from './en.json';

import type { DeepStringify } from '$shared/i18n';
import type ko from './ko.json';

en satisfies DeepStringify<typeof ko>;

export const PAGE_HOME_I18N_NAMESPACE = 'pages/home';
