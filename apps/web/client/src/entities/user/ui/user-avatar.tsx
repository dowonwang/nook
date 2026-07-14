import {
  Avatar,
  AvatarBody,
  AvatarFallBack,
} from '@packages/ui/components/avatar';

interface Props {
  name: string;
}

export function UserAvatar({ name }: Props) {
  const firstChar = name.slice(0, 1).toUpperCase();

  return (
    <Avatar>
      <AvatarFallBack>{name}</AvatarFallBack>
      <AvatarBody>
        <div className='bg-primary text-primary-foreground flex aspect-square h-full items-center justify-center rounded-xl text-lg font-semibold'>
          {firstChar}
        </div>
      </AvatarBody>
    </Avatar>
  );
}
