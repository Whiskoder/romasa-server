import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Representa el establecimiento donde se realizan
 * los servicios mecánicos
 */
@Entity()
export class Workshop {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  // TODO: Horario de atencion
}
