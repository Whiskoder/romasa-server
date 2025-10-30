import { User } from 'src/users/entities/user.entity';

export class ResponseGroupDto {
  id: string;
  name: string;
  isActive: boolean;
  permissions: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  workOrderDiagnosticApprovers: User[];
}
