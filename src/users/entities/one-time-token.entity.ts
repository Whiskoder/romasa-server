import { User } from 'src/users/entities';
import { OneTimeTokenType } from 'src/users/enums';

export class OneTimeToken {
  id: string;

  user: User;

  tokenType: OneTimeTokenType;

  tokenHash: string;

  createdAt: Date;

  updatedAt: Date;
}
