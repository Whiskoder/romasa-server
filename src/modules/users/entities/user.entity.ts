import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Roles } from '@mod/users/enums/roles.enum';
import { Employee } from '@mod/employee/entities/employee.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false })
  role: Roles;

  @Column({ type: 'nvarchar', length: 60, nullable: true }) // bcrypt length is always 60
  hashedPassword: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  email: string;

  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @Column({ type: 'bit', nullable: false, default: 1 })
  isActive: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}

/*

https://github.com/netlify/gotrue/blob/master/models/audit_log_entry.go

type User struct {
	InstanceID uuid.UUID `json:"-" db:"instance_id"`
	ID         uuid.UUID `json:"id" db:"id"`

	Aud               string     `json:"aud" db:"aud"`
	Role              string     `json:"role" db:"role"`
	Email             string     `json:"email" db:"email"`
	EncryptedPassword string     `json:"-" db:"encrypted_password"`
	ConfirmedAt       *time.Time `json:"confirmed_at,omitempty" db:"confirmed_at"`
	InvitedAt         *time.Time `json:"invited_at,omitempty" db:"invited_at"`

	ConfirmationToken  string     `json:"-" db:"confirmation_token"`
	ConfirmationSentAt *time.Time `json:"confirmation_sent_at,omitempty" db:"confirmation_sent_at"`

	RecoveryToken  string     `json:"-" db:"recovery_token"`
	RecoverySentAt *time.Time `json:"recovery_sent_at,omitempty" db:"recovery_sent_at"`

	EmailChangeToken  string     `json:"-" db:"email_change_token"`
	EmailChange       string     `json:"new_email,omitempty" db:"email_change"`
	EmailChangeSentAt *time.Time `json:"email_change_sent_at,omitempty" db:"email_change_sent_at"`

	LastSignInAt *time.Time `json:"last_sign_in_at,omitempty" db:"last_sign_in_at"`

	AppMetaData  JSONMap `json:"app_metadata" db:"raw_app_meta_data"`
	UserMetaData JSONMap `json:"user_metadata" db:"raw_user_meta_data"`

	IsSuperAdmin bool `json:"-" db:"is_super_admin"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type RefreshToken struct {
	InstanceID uuid.UUID `json:"-" db:"instance_id"`
	ID         int64     `db:"id"`

	Token string `db:"token"`

	UserID uuid.UUID `db:"user_id"`

	Revoked   bool      `db:"revoked"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}


OneTimeToken
*/
