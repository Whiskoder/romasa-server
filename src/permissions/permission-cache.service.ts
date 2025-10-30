import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uuidPlugin } from 'src/core/plugins';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionCacheService implements OnModuleInit {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  private _cache = new Map<string, Set<string>>();
  private _permissionVersions = new Map<string, string>();

  async onModuleInit() {
    await this.loadAllPermissions();
  }

  private async loadAllPermissions() {
    const groups = await this.groupsRepository.find();

    groups.forEach(({ id, permissions }) => {
      if (permissions && permissions?.length) {
        this._cache.set(id, new Set([...permissions.split(',')]));
        this._permissionVersions.set(id, uuidPlugin.v7());
      }
    });
  }

  getGroupPermissions(groupId?: string, permissionsVersion?: string) {
    if (!groupId || !permissionsVersion) return null;
    const validVersion = this._permissionVersions.get(groupId);

    if (!validVersion) return null;

    if (validVersion !== permissionsVersion) return null;

    const permissions = this._cache.get(groupId);
    if (!permissions) return new Set();

    return new Set([...permissions]);
  }

  getGroupPermissionsVersion(groupId: string) {
    const permissionsVersion = this._permissionVersions.get(groupId);
    if (!permissionsVersion) return null;

    return permissionsVersion;
  }

  deleteGroup(id: string) {
    this._cache.delete(id);
    this._permissionVersions.delete(id);
    this._permissionVersions.set(id, uuidPlugin.v7());
  }

  async invalidateGroup(id: string, newPermissions?: Set<string>) {
    this._permissionVersions.delete(id);
    this._permissionVersions.set(id, uuidPlugin.v7());

    if (!newPermissions) return;
    this._cache.delete(id);
    this._cache.set(id, newPermissions);

    // const group = await this.groupsRepository.findOne({
    //   where: { id },
    // });
    // if (!group) return;

    // console.log(group);

    // const permissions = group?.permissions?.split(',');

    // if (!permissions) return;
    // if (!permissions.length) return;
  }
}

/**
 * Cargar todos los permisos de los grupos, groupsService,
 * Obtener los permisos de cada grupo,
 *
 * currentVersion: nanoId
 *
 * Invalidar los permisos de un grupo cuando se actualiza el grupo
 * Volver a cargar los permisos de ese grupo
 * actualizar currentVersion nanoId
 *
 * <group: Id, currentVersion: id>
 * <group: Id, permissionsCache: Permissions[]>
 */
