import { CustomerEntity } from 'src/customers/infraestructure/persistence/relational/entities';
import { UserEntity } from 'src/users/infraestructure/persistence/relational/entities';
import { VehicleEntity } from 'src/vehicles/infraestructure/persistence/relational/entities';
import { WorkOrderEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ServiceRequestEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 10, nullable: false })
  trackingCode: string;

  @Column({ type: 'nvarchar', length: 25, nullable: false })
  priority: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    nullable: false,
  })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    nullable: false,
  })
  updatedBy: UserEntity;

  @ManyToOne(() => CustomerEntity, (customerEntity) => customerEntity.id, {
    nullable: false,
  })
  requester: CustomerEntity;

  @ManyToOne(() => VehicleEntity, (vehicleEntity) => vehicleEntity.id, {
    nullable: false,
  })
  vehicleEntity: VehicleEntity;

  @OneToMany(() => WorkOrderEntity, (workOrderEntity) => workOrderEntity.id)
  workOrders: WorkOrderEntity[];
}
