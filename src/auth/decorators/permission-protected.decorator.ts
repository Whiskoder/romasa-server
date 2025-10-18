import { SetMetadata } from '@nestjs/common';

export const META_PERMISSION = 'permission';

export const PermissionProtected = (...args: string[]) =>
  SetMetadata(META_PERMISSION, args);
