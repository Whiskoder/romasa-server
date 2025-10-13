import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CustomerEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'nvarchar', length: 25, nullable: false })
  type: 'external' | 'internal';
}
