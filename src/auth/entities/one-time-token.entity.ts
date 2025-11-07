import { User } from 'src/users/entities/user.entity';
import { OneTimeTokenType } from 'src/users/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OneTimeToken {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column({ type: 'int', nullable: true })
  employeeId: number;

  @Column({ type: 'nvarchar', length: 255 })
  email: string;

  @Column({ type: 'nvarchar', length: 25 })
  tokenType: OneTimeTokenType;

  @Column({ type: 'binary', length: 255 })
  nonce: Buffer; // hash nonce

  @Column({ type: 'bit', nullable: false, default: false })
  isExpired: boolean;

  @Column({ type: 'datetime' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
