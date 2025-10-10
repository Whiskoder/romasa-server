import { Exclude, Expose } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/employees/dto';
import { Branch } from 'src/shared/enums';
import { Roles } from 'src/users/enums';

@Exclude()
export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  role: Roles;

  @Expose()
  branch: Branch;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  employee: ResponseEmployeeDto;
}
