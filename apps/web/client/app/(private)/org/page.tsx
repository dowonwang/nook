import { Button } from '@packages/ui/components/button';
import {
  Card,
  CardBody,
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
      <HeroSection action={<Button>Create</Button>}>
        <HeroSectionTitle>Organization</HeroSectionTitle>
        <HeroSectionDescription>
          Manage team members and their roles
        </HeroSectionDescription>
      </HeroSection>

      <div className='grid grid-cols-3 gap-4'>
        <Card>
          <CardHeader action={<Button>View</Button>}>
            <CardTitle>Organization Title</CardTitle>
          </CardHeader>
          <CardBody>Organization Info</CardBody>
        </Card>

        <Card>
          <CardHeader action={<Button>View</Button>}>
            <CardTitle>Organization Title</CardTitle>
          </CardHeader>
          <CardBody>Organization Info</CardBody>
        </Card>

        <Card>
          <CardHeader action={<Button>View</Button>}>
            <CardTitle>Organization Title</CardTitle>
          </CardHeader>
          <CardBody>Organization Info</CardBody>
        </Card>

        <Card>
          <CardHeader action={<Button>View</Button>}>
            <CardTitle>Organization Title</CardTitle>
          </CardHeader>
          <CardBody>Organization Info</CardBody>
        </Card>
      </div>
    </div>
  );
}
