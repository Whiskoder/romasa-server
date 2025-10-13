import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { WorkOrderEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { EmployeeEntity } from 'src/employees/infraestructure/persistence/relational/entities';

@Entity()
export class WorkOrderDiagnosticEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => WorkOrderEntity, (workOrderEntity) => workOrderEntity.id, {
    nullable: false,
  })
  workOrderEntity: WorkOrderEntity;

  @ManyToOne(() => EmployeeEntity, (employeeEntity) => employeeEntity.id, {
    nullable: false,
  })
  reportedByDriver: EmployeeEntity;

  @Column({ type: 'nvarchar', length: 255, nullable: false }) // TODO: review length
  reportedSymptoms: string;

  @Column({ type: 'bit', nullable: false })
  impactsOperability: boolean;

  @Column({ type: 'nvarchar', length: 25, nullable: false })
  issueFrequency: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  technicalDescription?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  affectedSystems?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  requiredMaterials?: string;
}
