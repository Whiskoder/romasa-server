import { Exclude, Expose } from "class-transformer";

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
}