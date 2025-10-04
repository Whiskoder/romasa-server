// import { ConsoleLogger, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';

// import { Repository } from 'typeorm';

// import { ICreateHttpLogDto } from 'src/logger/dtos/create-http-log.dto';
// import { EnvironmentVariables } from '@config/env.config';
// import { Log } from 'src/logger/entities/logger.entity';
// import { LogLevel } from 'src/logger/enums/log-level.enum';

// @Injectable()
// export class DatabaseLogger extends ConsoleLogger {
//   private readonly isProduction: boolean;

//   constructor(
//     @InjectRepository(Log) private readonly logRepository: Repository<Log>,
//     private readonly configService: ConfigService<EnvironmentVariables, true>,
//   ) {
//     super();
//     const mode = this.configService.get('server.mode', { infer: true });
//     this.isProduction = mode === 'production';
//   }

//   override log(message: unknown, context?: string) {
//     if (!this.isProduction) super.log(message, context);
//   }

//   async httpSuccess(createHttpLogDto: ICreateHttpLogDto) {
//     const { message, context } = createHttpLogDto;
//     if (!this.isProduction) super.log(message, context);

//     await this.createLog(LogLevel.httpSuccess, createHttpLogDto);
//   }

//   async httpError(createHttpLogDto: ICreateHttpLogDto) {
//     const { message, context } = createHttpLogDto;
//     if (!this.isProduction) super.warn(message, context);

//     await this.createLog(LogLevel.httpError, createHttpLogDto);
//   }

//   private async createLog(
//     level: LogLevel,
//     createHttpLogDto: ICreateHttpLogDto,
//   ) {
//     const log = this.logRepository.create({
//       level,
//       ...createHttpLogDto,
//     });
//     await this.logRepository.save(log).catch((e) => {
//       if (!this.isProduction)
//         super.error('Failed to save log to database', e.message);
//     });
//   }
// }
