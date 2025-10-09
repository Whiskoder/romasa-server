import { Exclude, Expose } from "class-transformer";
import { ResponseEmployeeDto } from "src/employees/dto";

@Exclude()
export class ResponseUserDto {
	@Expose()
	id: string

	@Expose()
	role: string

	@Expose()
	email: string

	@Expose()
	createdAt: Date

	@Expose()
	updatedAt: Date

	@Expose()
	employee: ResponseEmployeeDto
}