import { Employee } from 'src/employees/domain';

export class User {
  id: string;

  hashedPassword: string;

  email: string;

  employee: Employee;

  isActive: boolean;

  encryptedTokenSecret: Buffer;

  createdAt: Date;

  updatedAt: Date;
}
