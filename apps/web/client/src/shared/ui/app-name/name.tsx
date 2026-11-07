import { CLIENT_ENV_CONFIG } from '$shared/config';

export function AppName() {
  return (
    <span className='text-primary font-black'>
      {CLIENT_ENV_CONFIG.APP_NAME}
    </span>
  );
}
