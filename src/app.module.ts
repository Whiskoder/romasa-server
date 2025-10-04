import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { EmployeesModule } from 'src/employees/employee.module';
import { HttpExceptionFilter } from 'src/shared/filters';
import { ResponseInterceptor } from 'src/shared/interceptors';
import { ServiceOperationsModule } from 'src/service-operations/service-operations.module';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { UsersModule } from 'src/users/user.module';
import { VehiclesModule } from 'src/vehicles/vehicle.module';

import appConfig from 'src/config/app.config';
import authConfig from 'src/auth/config/auth.config';
import cryptoConfig from 'src/crypto/config/crypto.config';
import databaseConfig from 'src/database/config/database.config';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, cryptoConfig, databaseConfig],
      envFilePath: '.env',
      cache: true,
    }),
    infrastructureDatabaseModule,
    AuthModule,
    EmployeesModule,
    ServiceOperationsModule,
    UsersModule,
    VehiclesModule,
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
})
export class AppModule {}
