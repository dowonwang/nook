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

import { AppName } from '$shared/ui';

const tw = String.raw;

export function HomePage() {
  const HEAD_STYLE = tw`mb-3 text-3xl font-black`;
  const DESCRIPTION_STYLE = tw`text-secondary-foreground mb-12 text-lg`;
  const ICON_STYLE = tw`bg-primary/10 text-primary inline-block h-10 w-10 rounded-lg p-1.5 shadow`;

  return (
    <div className='space-y-30'>
      <section className='text-center'>
        <h1 className={HEAD_STYLE}>
          우리의 협업공간 <AppName />
        </h1>

        <p className={DESCRIPTION_STYLE}>
          <AppName />는 조직을 구성하고, 자료를 공유하며, 소통할 수 있도록
          <br />
          지원하는 작은 협업 공간입니다.
        </p>

        <div className='grid grid-cols-1 gap-4 text-start md:grid-cols-3'>
          <Card>
            <CardBody className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Building className={ICON_STYLE} />
                <span className='bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs shadow'>
                  제작중
                </span>
              </div>
              <CardTitle>조직 관리</CardTitle>
              <CardDescription>
                조직을 만들고 멤버를 초대해 관리합니다.
              </CardDescription>
            </CardBody>
          </Card>

          <Card>
            <CardBody className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Share2 className={ICON_STYLE} />
                <span className='bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs shadow'>
                  구현 예정
                </span>
              </div>
              <CardTitle>파일 공유</CardTitle>
              <CardDescription>
                조직의 파일을 업로드하고 공유합니다.
              </CardDescription>
            </CardBody>
          </Card>

          <Card>
            <CardBody className='space-y-4'>
              <div className='flex items-center justify-between'>
                <MessageCircle className={ICON_STYLE} />
                <span className='bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs shadow'>
                  구현 예정
                </span>
              </div>
              <CardTitle>실시간 대화</CardTitle>
              <CardDescription>
                같은 조직의 멤버들과 대화합니다.
              </CardDescription>
            </CardBody>
          </Card>
        </div>
      </section>

      <Separator />

      <section className='text-center'>
        <h2 className={HEAD_STYLE}>
          <AppName />를 만든 이유
        </h2>

        <p className={DESCRIPTION_STYLE}>
          복잡해지는 도메인과 재사용의 한계를 구조적으로 해결하고자
          시작했습니다.
          <br />
          프론트엔드 아키텍쳐를 개선하고, 백엔드까지 직접 구현하며 협업의 깊이를
          더하고자 합니다.
        </p>

        <div className='grid grid-cols-1 gap-4 text-start md:grid-cols-2'>
          <Card>
            <CardHeader className='flex items-center gap-3'>
              <LayoutTemplate className={ICON_STYLE} />
              <CardTitle level='h3'>Front-End</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>문제점</dt>
                  <dd className='text-secondary-foreground'>
                    기능이 늘어날수록 컴포넌트와 로직의 위치가 모호해짐
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>해결 방식</dt>
                  <dd className='text-secondary-foreground'>
                    Feature-Sliced Design(FSD)을 통한 책임과 의존성 분리
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>목표</dt>
                  <dd className='text-secondary-foreground'>
                    기능 확장에도 예측 가능하고 재사용 가능한 구조 구축
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className='flex items-center gap-3'>
              <HardDrive className={ICON_STYLE} />
              <CardTitle level='h3'>Back-End</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>문제점</dt>
                  <dd className='text-secondary-foreground'>
                    API 스펙 변경 시 클라이언트 타입 불일치 및 수동 동기화 비용
                    발생
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>해결 방식</dt>
                  <dd className='text-secondary-foreground'>
                    OpenAPI 스펙 기반 Orval 코드 자동 생성 및 공유 패키지 구축
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>목표</dt>
                  <dd className='text-secondary-foreground'>
                    타입 안정성 확보
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
          <AppName />, 이렇게 만들었습니다.
        </h2>

        <p className={DESCRIPTION_STYLE}>
          앞서 정의한 문제를 해결하고, 개발 생산성과 타입 안정성을 위해 선택한
          기술입니다.
        </p>

        <div className='grid grid-cols-1 gap-4 text-start md:grid-cols-2'>
          {/* Front-End */}
          <Card>
            <CardHeader className='flex items-center gap-3'>
              <LayoutTemplate className={ICON_STYLE} />
              <CardTitle level='h3'>Front-End</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>Next.js & TypeScript</dt>
                  <dd className='text-secondary-foreground'>
                    FSD(Feature-Sliced Design) 아키텍처를 적용하여 레이어 간
                    책임 분리와 예측 가능한 구조 구축
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>TanStack Query</dt>
                  <dd className='text-secondary-foreground'>
                    자동 생성된 API 클라이언트를 활용하여 서버 상태 관리 및 캐싱
                    최적화
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          {/* Back-End & Shared */}
          <Card>
            <CardHeader className='flex items-center gap-3'>
              <HardDrive className={ICON_STYLE} />
              <CardTitle level='h3'>Back-End & Shared</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className='space-y-6'>
                <div className='space-y-1'>
                  <dt className='font-semibold'>ElysiaJS & Bun & PostgreSQL</dt>
                  <dd className='text-secondary-foreground'>
                    Bun의 빠른 런타임 환경과 TypeScript 지원에 뛰어난 Elysia를
                    활용해 OpenAPI 명세 기반 백엔드 구축
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>DDD & CQRS (Architecture)</dt>
                  <dd className='text-secondary-foreground'>
                    비즈니스 로직을 도메인 단위로 격리(DDD)하고, 조회와 상태
                    변경 책임(CQRS)을 분리하여 확장성과 복잡도 관리 최적화
                  </dd>
                </div>

                <div className='space-y-1'>
                  <dt className='font-semibold'>Shared Packages (Monorepo)</dt>
                  <dd className='text-secondary-foreground'>
                    공통 UI, Orval 생성 API 클라이언트, DB 설정, i18n을 독립
                    패키지로 분리해 재사용성과 관리 효율성 증대
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
