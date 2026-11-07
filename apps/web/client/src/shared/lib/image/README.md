# image

Next 이미지 값을 CSS에서 쓸 수 있는 형태로 바꿉니다.

## Exports

### Functions

#### `getBackgroundImage`

`getImageProps`가 돌려준 `srcSet`을 CSS `image-set()` 문자열로 바꿉니다. 배경 이미지로 Next 이미지 최적화를 쓸 때 사용합니다.

```tsx
import { getImageProps } from 'next/image';

import { getBackgroundImage } from '$shared/lib/image';

const {
  props: { srcSet },
} = getImageProps({ alt: '', width: 60, height: 60, src: '/images/logo.png' });

const style = { backgroundImage: getBackgroundImage(srcSet) };
```
