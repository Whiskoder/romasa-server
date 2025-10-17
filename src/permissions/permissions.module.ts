import { forwardRef, Global, Module } from '@nestjs/common';

import { GroupsModule } from 'src/groups/groups.module';
import { PermissionCacheService } from 'src/permissions/permission-cache.service';
import { PermissionsController } from 'src/permissions/permissions.controller';

@Global()
@Module({
  imports: [forwardRef(() => GroupsModule)],
  providers: [PermissionCacheService],
  exports: [PermissionCacheService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
