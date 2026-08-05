import { Button } from '@packages/ui/components/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';

export default function Page() {
  return (
    <div className='space-y-6'>
      <HeroSection>
        <HeroSectionTitle>Dashboard</HeroSectionTitle>
        <HeroSectionDescription>
          Welcome back! Here is what is happening in your workspace.
        </HeroSectionDescription>
      </HeroSection>

      <div className='grid grid-cols-4 gap-2'>
        <Card>
          <CardTitle srOnly>접근성 타이틀</CardTitle>

          <CardBody>header 없는 카드</CardBody>
        </Card>
        <Card>
          <CardTitle srOnly>접근성 타이틀</CardTitle>

          <CardBody>header 없는 카드</CardBody>
        </Card>

        <Card>
          <CardTitle srOnly>접근성 타이틀</CardTitle>

          <CardBody>header 없는 카드</CardBody>
        </Card>

        <Card>
          <CardTitle srOnly>접근성 타이틀</CardTitle>

          <CardBody>header 없는 카드</CardBody>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader action={<Button>View all</Button>}>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>description</CardDescription>
          </CardHeader>
          <CardBody>data list</CardBody>
        </Card>
      </div>
    </div>
  );
}
