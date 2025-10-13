import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkOrderEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';

@Entity()
export class WorkOrderServiceEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => WorkOrderEntity, (workOrderEntity) => workOrderEntity.id, {
    nullable: false,
  })
  workOrderEntity: WorkOrderEntity;

  @Column({ type: 'int', nullable: false })
  fuelLevelAtReception: number;

  @Column({ type: 'int', nullable: false })
  mileageAtReception: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  receivedInventoryItems: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  roofObservations: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  frontObservations: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  leftSideObservations: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  rightSideObservations: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  rearObservations: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  performedServices?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  installedReplacementParts?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  addedFluids?: string;
}
