import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';

export default function Page() {
  return (
    <div className='grid h-full grid-cols-3 gap-2'>
      <Card className='col-span-2 h-full'>
        <CardHeader>
          <CardTitle>파일명</CardTitle>
          <CardDescription>파일 정보</CardDescription>
        </CardHeader>

        <CardBody>파일 미리보기</CardBody>
      </Card>

      <Card className='h-full'>
        <CardHeader>
          <CardTitle>Team Chat</CardTitle>
          <CardDescription>9 Members</CardDescription>
        </CardHeader>

        <CardBody>채팅 내용</CardBody>
      </Card>
    </div>
  );
}
