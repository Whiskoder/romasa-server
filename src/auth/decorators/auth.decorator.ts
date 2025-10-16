import { applyDecorators, UseGuards } from '@nestjs/common';

import {
  AccessTokenGuard,
  RefreshTokenGuard,
  OneTimeTokenGuard,
  UserPermissionGuard,
} from 'src/auth/guards';
import { PermissionProtected } from 'src/auth/decorators';

export function AuthGuard(...permissions: string[]) {
  return applyDecorators(
    PermissionProtected(...permissions),
    UseGuards(AccessTokenGuard, UserPermissionGuard),
  );
}

export function AuthRefreshToken() {
  return applyDecorators(UseGuards(RefreshTokenGuard));
}

export function AuthOneTimeToken() {
  return applyDecorators(UseGuards(OneTimeTokenGuard));
}
