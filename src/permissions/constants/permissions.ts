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
  diagnostic_work_orders: {
    create_without_approval: 'diagnostic_work_orders:create:without_approval',
    create_with_required_approval:
      'diagnostic_work_orders:create:with_required_approval',
  },
  service_work_orders: {
    create_without_approval: 'service_work_orders:create:without_approval',
    create_with_required_approval:
      'service_work_orders:create:with_required_approval',
  },
  users: {
    view_all: 'users:view:all',
    create: 'users:create',
  },
  groups: {
    view_all: 'groups:view:all',
    create: 'groups:create',
    edit: 'groups:edit',
    update: 'groups:update',
    delete: 'groups:delete',
    manage_permissions: 'groups:manage:permissions',
    manage_users: 'groups:manage:users',
  },
  employees: {
    view_all: 'employees:view:all',
  },
  workshops: {
    create: 'workshops:create',
  },
  customers: {
    create: 'customers:create',
    view_all: 'customers:view:all',
  },
  vehicles: {
    view_all: 'vehicles:view:all',
  },
} as const;

export const ALL_PERMISSIONS_VALUES = Object.values(Permissions)
  .flatMap((obj) => Object.values(obj))
  .filter((val) => typeof val === 'string') as string[];
