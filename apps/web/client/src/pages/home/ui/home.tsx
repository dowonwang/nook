import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { Separator } from '@packages/ui/components/separator';
import {
  Building,
  HardDrive,
  LayoutTemplate,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { getT } from 'next-i18next/server';
import { Trans } from 'react-i18next/TransWithoutContext';

import { AppName } from '$shared/ui';

const tw = String.raw;

export async function HomePage() {
  const HEAD_STYLE = tw`mb-3 text-3xl font-black`;
  const DESCRIPTION_STYLE = tw`text-secondary-foreground mb-12 text-lg`;
  const ICON_STYLE = tw`bg-primary/10 text-primary inline-block h-10 w-10 rounded-lg p-1.5 shadow`;
  const { t, i18n } = await getT('pages/home');

  return (
    <div className='space-y-30'>
      <section className='text-center'>
        <h1 className={HEAD_STYLE}>
          <Trans
            t={t}
            i18n={i18n}
            i18nKey={'hero.title'}
            components={{ appName: <AppName /> }}
          />
        </h1>

        <p className={DESCRIPTION_STYLE}>
          <Trans
            t={t}
            i18n={i18n}
            i18nKey={'hero.description'}
            components={{
              appName: <AppName />,
            }}
          />
        </p>

        <div className='grid grid-cols-1 gap-4 text-start md:grid-cols-3'>
          <Card>
            <CardBody className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Building className={ICON_STYLE} />
                <span className='bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs shadow'>
                  {t('hero.features.organization.status')}
                </span>
              </div>
              <CardTitle>{t('hero.features.organization.title')}</CardTitle>
              <CardDescription>
                {t('hero.features.organization.description')}
              </CardDescription>
            </CardBody>
          </Card>

          <Card>
            <CardBody className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Share2 className={ICON_STYLE} />
                <span className='bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs shadow'>
                  {t('hero.features.fileShare.status')}
                </span>
              </div>
              <CardTitle>{t('hero.features.fileShare.title')}</CardTitle>
              <CardDescription>
                {t('hero.features.fileShare.description')}
              </CardDescription>
            </CardBody>
          </Card>

          <Card>
            <CardBody className='space-y-4'>
              <div className='flex items-center justify-between'>
                <MessageCircle className={ICON_STYLE} />
                <span className='bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs shadow'>
                  {t('hero.features.realtimeChat.status')}
                </span>
              </div>
              <CardTitle>{t('hero.features.realtimeChat.title')}</CardTitle>
              <CardDescription>
                {t('hero.features.realtimeChat.description')}
              </CardDescription>
            </CardBody>
          </Card>
        </div>
      </section>

      <Separator />

      <section className='text-center'>
        <h2 className={HEAD_STYLE}>
          <Trans
            t={t}
            i18n={i18n}
            i18nKey={'motivation.title'}
            components={{
              appName: <AppName />,
            }}
          />
        </h2>

        <p className={DESCRIPTION_STYLE}>
          <Trans t={t} i18n={i18n} i18nKey={'motivation.description'} />
        </p>

        <div className='grid grid-cols-1 gap-4 text-start md:grid-cols-2'>
          <Card>
            <CardHeader className='flex items-center gap-3'>
              <LayoutTemplate className={ICON_STYLE} />
              <CardTitle level='h3'>{t('motivation.frontend.title')}</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('motivation.frontend.problem.label')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('motivation.frontend.problem.description')}
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('motivation.frontend.solution.label')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('motivation.frontend.solution.description')}
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('motivation.frontend.goal.label')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('motivation.frontend.goal.description')}
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className='flex items-center gap-3'>
              <HardDrive className={ICON_STYLE} />
              <CardTitle level='h3'>{t('motivation.backend.title')}</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('motivation.backend.problem.label')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('motivation.backend.problem.description')}
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('motivation.backend.solution.label')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('motivation.backend.solution.description')}
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('motivation.backend.goal.label')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('motivation.backend.goal.description')}
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>
        </div>
      </section>

      <Separator />

      <section className='text-center'>
        <h2 className={HEAD_STYLE}>
          <Trans
            t={t}
            i18n={i18n}
            i18nKey={'technology.title'}
            components={{
              appName: <AppName />,
            }}
          />
        </h2>

        <p className={DESCRIPTION_STYLE}>{t('technology.description')}</p>

        <div className='grid grid-cols-1 gap-4 text-start md:grid-cols-2'>
          {/* Front-End */}
          <Card>
            <CardHeader className='flex items-center gap-3'>
              <LayoutTemplate className={ICON_STYLE} />
              <CardTitle level='h3'>{t('technology.frontend.title')}</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('technology.frontend.nextjs.title')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('technology.frontend.nextjs.description')}
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('technology.frontend.tanstackQuery.title')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('technology.frontend.tanstackQuery.description')}
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          {/* Back-End & Shared */}
          <Card>
            <CardHeader className='flex items-center gap-3'>
              <HardDrive className={ICON_STYLE} />
              <CardTitle level='h3'>{t('technology.backend.title')}</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('technology.backend.elysia.title')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('technology.backend.elysia.description')}
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('technology.backend.architecture.title')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('technology.backend.architecture.description')}
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>
                    {t('technology.backend.sharedPackages.title')}
                  </dt>
                  <dd className='text-secondary-foreground'>
                    {t('technology.backend.sharedPackages.description')}
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
