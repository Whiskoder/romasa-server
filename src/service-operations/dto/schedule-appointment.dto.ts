import { IsDateString } from 'class-validator';

export class ScheduleAppointmentDto {
  @IsDateString({strict: true, strictSeparator: true})
  date: string;
}
