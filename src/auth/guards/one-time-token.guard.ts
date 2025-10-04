import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TokenType } from 'src/auth/enum';

@Injectable()
export class OneTimeTokenGuard extends AuthGuard(TokenType.one_time_token) {}
