import { applyDecorators, UseGuards } from '@nestjs/common';

import {
  AccessTokenGuard,
  RefreshTokenGuard,
  OneTimeTokenGuard,
} from 'src/auth/guards';

export function AuthAccess() {
  return applyDecorators(UseGuards(AccessTokenGuard));
}

export function AuthRefreshToken() {
  return applyDecorators(UseGuards(RefreshTokenGuard));
}

export function AuthOneTimeToken() {
  return applyDecorators(UseGuards(OneTimeTokenGuard));
}
