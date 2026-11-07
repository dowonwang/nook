# date

locale이 적용된 dayjs 객체를 만듭니다. `localizedFormat` 플러그인과 `ko`, `en` locale을 여기서 불러오므로, 날짜는 dayjs를 직접 import하지 않고 이 라이브러리로 만듭니다.

## Exports

### Functions

#### `createDate`

값과 locale을 받아 dayjs 객체를 돌려줍니다. locale을 넘기지 않으면 기본 언어를 씁니다.

```tsx
import { useLocale } from '$shared/i18n';
import { createDate } from '$shared/lib/date';

const locale = useLocale();
const today = createDate(new Date(), locale).format('LL');
```
