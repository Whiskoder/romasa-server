import { User } from 'src/users/domain';

export class Group {
  id: string;

  name: string;

  isActive: boolean;

  users: User[];

  permissions: string;

  createdAt: Date;

  updatedAt: Date;
}
