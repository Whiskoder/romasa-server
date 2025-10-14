// formato: recurso: accion: alcance;
// Recurso: service_diagnosis;
// accion: (see, create, approve, reject, schedule, alcance, own, all, branch);
export enum ServiceDiagnosisPermissions {
  'service_diagnosis:see:all' = 'service_diagnosis:see:all',
  'service_diagnosis:see:own' = 'service_diagnosis:see:own',
  'service_diagnosis:see:branch' = 'service_diagnosis:see:branch',

  'service_diagnosis:schedule' = 'service_diagnosis:schedule',
  'service_diagnosis:approve' = 'service_diagnosis:approve',
  'service_diagnosis:reject' = 'service_diagnosis:reject',

  'service_diagnosis:create:without_approval' = 'service_diagnosis:create:without_approval',
  'service_diagnosis:create:with_required_approval' = 'service_diagnosis:create:with_required_approval',
}

// recurso: service_requests
// action: view, create, approve, reject, schedule
// condition: own, all, branch
