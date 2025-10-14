import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  // employee: ResponseEmployeeDto;

  // groups: ResponseGroupDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
