import { getImageProps } from 'next/image';

import { ENV_CONFIG } from '$shared/config';
import { getBackgroundImage } from '$shared/lib/image';

interface Props {
  height?: number;
  width?: number;
}

export function AppLogo({ height = 60, width = 60 }: Props) {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: '',
    height,
    width,
    src: `/logo.png`,
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style: React.CSSProperties = {
    backgroundImage,
    width,
    height,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return (
    <div
      aria-label={`${ENV_CONFIG.appName} Logo`}
      role='img'
      className='rounded-xl'
      style={style}
    ></div>
  );
}
