export const Permissions = {
  service_requests: {
    view_all: 'service_requests:view:all',
    view_own: 'service_requests:view:own',
    view_branch: 'service_requests:view:branch',
    create: 'service_requests:create',
    approve: 'service_requests:approve',
    reject: 'service_requests:reject',
    schedule: 'service_requests:schedule',
  },
  users: {
    create: 'users:create',
  },
  groups: {
    view_all: 'groups:view:all',
    create: 'groups:create',
    edit: 'groups:edit',
    delete: 'groups:delete',
    manage_permissions: 'groups:manage:permissions',
    manage_users: 'groups:manage:users',
  },
  employees: {},
  workshops: {
    create: 'workshops:create',
  },
  customers: {
    create: 'customers:create',
  },
} as const;

export const ALL_PERMISSIONS_VALUES = Object.values(Permissions)
  .flatMap((obj) => Object.values(obj))
  .filter((val) => typeof val === 'string') as string[];
