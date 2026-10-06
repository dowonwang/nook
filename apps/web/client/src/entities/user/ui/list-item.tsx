import type { User } from '../model/types';

interface Props extends React.HtmlHTMLAttributes<HTMLLIElement> {
  user: User;
}

export function UserListItem({ user, ...rest }: Props) {
  return (
    <li {...rest}>
      {user.name} {user.email}
    </li>
  );
}
