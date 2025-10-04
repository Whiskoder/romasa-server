import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { OneTimeTokenType } from '../enums/one-time-token-type.enum';
import { User } from './user.entity';

@Entity({ name: 'one_time_tokens' })
export class OneTimeToken {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'nvarchar', length: 50, nullable: false })
  tokenType: OneTimeTokenType;

  @Column({ type: 'nvarchar', length: 72, nullable: false })
  tokenHash: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
