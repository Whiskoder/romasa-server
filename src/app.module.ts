import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';

import { HttpExceptionFilter } from 'src/core/filters';
import { ResponseInterceptor } from 'src/core/interceptors';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';

import { appConfig } from 'src/core/config';
import authConfig from 'src/auth/config/auth.config';
import cryptoConfig from 'src/crypto/config/crypto.config';
import databaseConfig from 'src/database/config/database.config';
import notificationsConfig from 'src/notifications/config/notifications.config';

import { AuthModule } from 'src/auth/auth.module';
import { CustomersModule } from 'src/customers/customers.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { WorkOrdersModule } from 'src/work-orders/work-orders.module';
import { ServiceRequestsModule } from 'src/service-requests/service-requests.module';
import { WorkshopsModule } from 'src/workshops/workshops.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

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
      load: [
        appConfig,
        authConfig,
        cryptoConfig,
        databaseConfig,
        notificationsConfig,
      ],
      envFilePath: '.env',
      cache: true,
    }),
    infrastructureDatabaseModule,
    AuthModule,
    CustomersModule,
    EmployeesModule,
    GroupsModule,
    UsersModule,
    VehiclesModule,
    WorkOrdersModule,
    ServiceRequestsModule,
    WorkshopsModule,
    PermissionsModule,
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
