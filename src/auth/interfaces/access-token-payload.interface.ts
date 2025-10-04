import { JwtPayload } from 'src/shared/interfaces';

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
}
