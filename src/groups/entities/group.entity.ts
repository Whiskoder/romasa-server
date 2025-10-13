import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'bit', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.id)
  users: User[];

  @Column({ type: 'text', nullable: true })
  permissions: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
