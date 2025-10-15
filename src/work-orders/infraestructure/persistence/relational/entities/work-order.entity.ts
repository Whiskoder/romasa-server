import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { ServiceRequestEntity } from 'src/service-requests/infraestructure/persistence/relational/entities';
import { WorkshopEntity } from 'src/workshops/infraestructure/persistence/relational/entities';
import { UserEntity } from 'src/users/infraestructure/persistence/relational/entities';
import { EmployeeEntity } from 'src/employees/infraestructure/persistence/relational/entities';
import { OrderStatus } from 'src/work-orders/enums';
import { WorkOrderDiagnosticEntity } from './work-order-diagnostic.entity';
import { WorkOrderServiceEntity } from './work-order-service.entity';

@Entity()
export class WorkOrderEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @OneToOne(
    () => WorkOrderDiagnosticEntity,
    (workOrderDiagnosticEntity) => workOrderDiagnosticEntity.id,
    { nullable: true },
  )
  diagnostic?: WorkOrderDiagnosticEntity;

  @OneToOne(
    () => WorkOrderServiceEntity,
    (workOrderServiceEntity) => workOrderServiceEntity.id,
    { nullable: true },
  )
  service?: WorkOrderServiceEntity;

  @ManyToOne(() => WorkshopEntity, (workshopEntity) => workshopEntity.id, {
    nullable: false,
  })
  workshopEntity: WorkshopEntity;

  @Column({ type: 'datetime', nullable: true })
  scheduledDate?: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    nullable: true,
  })
  scheduledBy?: UserEntity;

  @Column({ type: 'datetime', nullable: true })
  estimatedDuration?: Date;

  @Column({ type: 'datetime', nullable: true })
  actualDuration?: Date;

  @ManyToOne(() => EmployeeEntity, (employeeEntity) => employeeEntity.id, {
    nullable: true,
  })
  supervisor?: EmployeeEntity;

  @ManyToOne(() => EmployeeEntity, (employeeEntity) => employeeEntity.id, {
    nullable: true,
  })
  assignedEmployeeEntity?: EmployeeEntity;

  @Column({ type: 'bit', nullable: true })
  vehicleInWorkshop?: boolean;

  @Column({ type: 'bit', default: true, nullable: false })
  requiresApproval: boolean;

  @ManyToMany(() => UserEntity)
  approversRequired?: UserEntity[];

  @ManyToMany(() => UserEntity)
  approvedBy?: UserEntity[];

  @ManyToMany(() => UserEntity)
  rejectedBy?: UserEntity[];

  @Column({ type: 'datetime', nullable: true })
  approvalDate?: Date;

  @Column({ type: 'nvarchar', length: 25, nullable: false })
  status: OrderStatus;
}
