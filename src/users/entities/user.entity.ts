import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Employee } from 'src/employees/entities';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  // bcrypt length is always 60
  @Column({ type: 'nvarchar', length: 60, nullable: true })
  hashedPassword: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  email: string;

  @ManyToOne(() => Employee, (employee) => employee.id, { eager: true })
  employee: Employee;

  @Column({ type: 'bit', nullable: false, default: 1 })
  isActive: boolean;

  @Column({ type: 'varbinary', length: 255, nullable: false })
  encryptedTokenSecret: Buffer;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
