import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';

import { CLIENT_ENV_CONFIG } from '$shared/config/client-env';

export function HomePage() {
  return (
    <div className='space-y-12'>
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold'>
          Welcome, {CLIENT_ENV_CONFIG.APP_NAME}
        </h1>
        <p className='text-secondary-foreground text-lg'>description</p>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardBody>Card Body</CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardBody>Card Body</CardBody>
        </Card>
      </div>
    </div>
  );
}
