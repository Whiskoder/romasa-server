import { User } from 'src/users/entities';

export class ResponseGroupDto {
  id: string;
  name: string;
  isActive: boolean;
  permissions: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}
