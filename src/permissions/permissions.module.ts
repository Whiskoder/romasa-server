import { forwardRef, Global, Module } from '@nestjs/common';

import { GroupsModule } from 'src/groups/groups.module';
import { PermissionCacheService } from 'src/permissions/permission-cache.service';

@Global()
@Module({
  imports: [forwardRef(() => GroupsModule)],
  providers: [PermissionCacheService],
  exports: [PermissionCacheService],
})
export class PermissionsModule {}
