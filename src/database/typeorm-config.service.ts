import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<string>('database.type', { infer: true }),
      host: this.configService.get<string>('database.host', { infer: true }),
      port: this.configService.get<number>('database.port', { infer: true }),
      username: this.configService.get<string>('database.user', {
        infer: true,
      }),
      password: this.configService.get<string>('database.pass', {
        infer: true,
      }),
      database: this.configService.get<string>('database.name', {
        infer: true,
      }),
      synchronize: this.configService.get<boolean>('database.sync', {
        infer: true,
      }),
      ssl: this.configService.get<boolean>('database.ssl', { infer: true }),
      autoLoadEntities: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      options: {
        encrypt: true,
      },
    } as TypeOrmModuleOptions;
  }
}
