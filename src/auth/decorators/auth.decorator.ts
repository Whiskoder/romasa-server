import { applyDecorators, UseGuards } from '@nestjs/common';

import {
  AccessTokenGuard,
  RefreshTokenGuard,
  OneTimeTokenGuard,
  UserRoleGuard,
} from 'src/auth/guards';
import { RoleProtected } from 'src/auth/decorators';
import { Roles } from 'src/users/enums';

export function AuthAccess(...roles: Roles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AccessTokenGuard, UserRoleGuard),
  );
}

export function AuthRefreshToken() {
  return applyDecorators(UseGuards(RefreshTokenGuard));
}

export function AuthOneTimeToken() {
  return applyDecorators(UseGuards(OneTimeTokenGuard));
}
