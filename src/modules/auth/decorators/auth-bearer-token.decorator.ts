import { applyDecorators, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '@mod/auth/guards/access-token.guard';
// import { InviteTokenGuard } from '@mod/auth/guards/invite-token.guard';
// import { RefreshTokenGuard } from '@mod/auth/guards/refresh-token.guard';
import { RoleProtected } from '@mod/auth/decorators/role-protected.decorator';
import { Roles } from '@mod/users/enums/roles.enum';
// import { FormTokenGuard } from '@mod/auth/guards/form-token.guard';
import { UserRoleGuard } from '@mod/auth/guards/user-role.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { OneTimeTokenGuard } from '../guards/one-time-token.guard';

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
  return applyDecorators(UseGuards(OneTimeTokenGuard))
}

// export function AuthRefresh() {
//   return applyDecorators(UseGuards(RefreshTokenGuard));
// }

// export function AuthRegister() {
//   return applyDecorators(UseGuards(InviteTokenGuard));
// }

// export function AuthForm() {
//   return applyDecorators(UseGuards(FormTokenGuard));
// }
