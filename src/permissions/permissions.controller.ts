import { Controller, Get } from '@nestjs/common';

import { AuthGuard } from 'src/auth/decorators';
import { ApiResponse } from 'src/core/decorators';
import { Permissions } from 'src/permissions/constants';

@Controller({
  version: '1',
  path: 'permissions',
})
export class PermissionsController {
  @Get()
  @AuthGuard(Permissions.groups.manage_permissions)
  @ApiResponse(200, 'Permissions found')
  async findAll(): Promise<{ permissions: Record<string, any> }> {
    return { permissions: Permissions };
  }

  /**
   * Tal vez a futuro se deban separar responsabilidades de auth/me
   * @Get('me') - Obtener permisos del usuario actual
   */
}
