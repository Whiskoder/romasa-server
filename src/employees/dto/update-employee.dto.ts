import { PartialType } from '@nestjs/mapped-types';

import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
