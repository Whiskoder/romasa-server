import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WorkOrderServiceEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'int', nullable: true })
  fuelLevelAtReception?: number;

  @Column({ type: 'int', nullable: true })
  mileageAtReception?: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  receivedInventoryItems?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  roofObservations?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  frontObservations?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  leftSideObservations?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  rightSideObservations?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  rearObservations?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  performedServices?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  installedReplacementParts?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  addedFluids?: string;
}
