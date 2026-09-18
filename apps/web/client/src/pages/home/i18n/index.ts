import en from './en.json';

import type { DeepStringify } from '$shared/i18n';
import type ko from './ko.json';

en satisfies DeepStringify<typeof ko>;
