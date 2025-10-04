import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import cookieParser from 'cookie-parser';

import { AppModule } from 'src/app.module';
import { EnvVar } from '@config/env.config';
// import { DatabaseLogger } from 'src/logger/database-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
  });

  // const logger = app.get(DatabaseLogger);
  const configService: ConfigService<EnvVar, true> = app.get(ConfigService);

  const port = configService.get('server.port', { infer: true });
  const origin = configService.get('server.origin', { infer: true });

  app.enableCors({
    origin: [origin],
    credentials: true,
  });

  // app.useLogger(logger)
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());

  await app.listen(port);
}
bootstrap();
