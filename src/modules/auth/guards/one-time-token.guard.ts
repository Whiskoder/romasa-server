import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenType } from '../enum/token-type.enum';

@Injectable()
export class OneTimeTokenGuard extends AuthGuard(TokenType.one_time_token) {}
