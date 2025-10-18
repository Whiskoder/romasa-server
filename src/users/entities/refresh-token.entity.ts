import { User } from 'src/users/entities';

export class RefreshToken {
  id: number;

  user: User;

  token: string;

  revoked: boolean;

  createdAt: Date;

  updatedAt: Date;
}
