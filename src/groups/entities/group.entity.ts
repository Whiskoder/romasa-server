import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity()
export class Group {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'bit', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.group)
  users: User[];

  @ManyToMany(() => User, (user) => user.woDiagnosticApproverGroups, {
    cascade: true,
  })
  @JoinTable()
  woDiagnosticApprovers: User[];

  @Column({ type: 'int', nullable: false, default: 1 })
  woDiagnosticMinimumApprovalsRequired: number;

  // TODO
  @Column({ type: 'text', nullable: true })
  permissions?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
