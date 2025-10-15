import { Exclude, Expose } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/employees/dto';

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

  // groups: ResponseGroupDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
