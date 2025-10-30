import { registerAs } from '@nestjs/config';

import { IsBoolean, IsEmail, IsString } from 'class-validator';

import { validateConfig } from 'src/core/utils';
import { NotificationsConfig } from 'src/notifications/config/notifications-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  RESEND_API_KEY: string;

  @IsBoolean()
  SEND_EMAIL: boolean;

  @IsEmail()
  FROM_EMAIL: string;
}

export default registerAs<NotificationsConfig>('notifications', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    resendApiKey: process.env.RESEND_API_KEY,
    send: process.env.SEND_EMAIL === 'true',
    from: process.env.FROM_EMAIL,
  };
});
