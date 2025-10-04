import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenType } from '../enum/token-type.enum';

@Injectable()
export class AccessTokenGuard extends AuthGuard(TokenType.access_token) {}
