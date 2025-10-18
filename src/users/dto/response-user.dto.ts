import { Exclude, Expose } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/employees/dto';
import { ResponseGroupDto } from 'src/groups/dto';

@Exclude()
export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  @Expose()
  employee: ResponseEmployeeDto;

  @Expose()
  group: ResponseGroupDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
