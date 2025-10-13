import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WorkshopEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  capacity: number;
}
