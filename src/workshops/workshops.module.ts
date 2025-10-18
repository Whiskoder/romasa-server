import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkshopsController } from 'src/workshops/workshops.controller';
import { WorkshopsService } from 'src/workshops/workshops.service';
import { Workshop } from 'src/workshops/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Workshop])],
  controllers: [WorkshopsController],
  providers: [WorkshopsService],
  exports: [WorkshopsService],
})
export class WorkshopsModule {}
