import { PartialType } from '@nestjs/mapped-types';

import { CreateEmployeeDto } from '@mod/employee/dto/create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
