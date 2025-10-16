import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities';

@Entity()
export class Group {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'bit', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.group)
  users: User[];

  // TODO
  @Column({ type: 'text', nullable: true })
  permissions?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
