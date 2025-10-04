import {
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryColumn({ type: 'uuid' })
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'text', nullable: false })
  token: string;

  @Column({ type: 'bit', nullable: false, default: 0 })
  revoked: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
