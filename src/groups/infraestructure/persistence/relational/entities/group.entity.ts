import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from 'src/users/infraestructure/persistence/relational/entities';

@Entity()
export class Group {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'bit', default: true })
  isActive: boolean;

  @OneToMany(() => UserEntity, (userEntity) => userEntity.id)
  userEntities: UserEntity[];

  @Column({ type: 'text', nullable: true })
  permissions: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
