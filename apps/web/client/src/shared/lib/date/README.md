# date

locale이 적용된 dayjs 객체를 만듭니다. `localizedFormat` 플러그인과 `ko`, `en` locale을 여기서 불러오므로, 날짜는 dayjs를 직접 import하지 않고 이 라이브러리로 만듭니다.

## Functions

### `createDate`

값과 locale로 dayjs 객체를 만듭니다.

#### Parameters

| 이름     | 타입               | 설명                                                      |
| -------- | ------------------ | --------------------------------------------------------- |
| `value`  | `dayjs.ConfigType` | 날짜로 바꿀 값입니다. `Date`, 문자열, 숫자 등을 받습니다. |
| `locale` | `I18nLocale?`      | 적용할 언어입니다. 없으면 기본 언어를 씁니다.             |

#### Returns

`Dayjs`: locale이 적용된 dayjs 객체입니다.

#### Examples

```tsx
import { useLocale } from '$shared/i18n';
import { createDate } from '$shared/lib/date';

const locale = useLocale();
const today = createDate(new Date(), locale).format('LL');
```
