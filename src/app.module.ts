import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '@config/env.config';
import { validationSchema } from '@config/env.schema';

import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';

import { EmployeesModule } from 'src/employee/employee.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { ServiceOperationsModule } from 'src/service-operations/service-operations.module';
import { UsersModule } from 'src/users/user.module';
import { AuthModule } from 'src/auth/auth.module';

srcule({
  imports: [
    // TODO: setup throttlerModule
    // ThrottlerModule.forRoot({
    //   throttlers: [
    //     {
    //       name: 'short',
    //       limit: 100,
    //       ttl: 10000,
    //     },
    //   ],
    // }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: validationSchema,
      validationOptions: {
        abortEarly: true,
        allowUnknown: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.name'),
        synchronize: configService.get<boolean>('database.sync'),
        ssl: configService.get<string>('database.ssl'),
        autoLoadEntities: true,
        options: {
          encrypt: true,
        },
      }),
    }),
    EmployeesModule,
    VehiclesModule,
    ServiceOperationsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
});
export class AppModule {}
