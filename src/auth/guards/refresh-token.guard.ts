import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TokenType } from 'src/auth/enum';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(TokenType.refresh_token) {}
