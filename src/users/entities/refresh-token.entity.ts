import { User } from 'src/users/entities/user.entity';

export class RefreshToken {
  id: number;

  user: User;

  token: string;

  revoked: boolean;

  createdAt: Date;

  updatedAt: Date;
}
