import { Column, ManyToOne, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

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
