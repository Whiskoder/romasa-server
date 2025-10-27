import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Resend } from 'resend';
import { INotificationStrategy } from '../interfaces';
import { AllConfigType } from 'src/core/config';
import { NotificationDto } from '../dto';

@Injectable()
export class EmailNotificationStrategy implements INotificationStrategy {
  private readonly resend: Resend;
  private readonly sendEmail: boolean;
  private readonly fromEmail: string;

  constructor(
    private readonly configService: ConfigService<AllConfigType, true>,
  ) {
    const resendApiKey = this.configService.get<string>(
      'notifications.resendApiKey',
      {
        infer: true,
      },
    );
    const sendEmail = this.configService.get<boolean>('notifications.send', {
      infer: true,
    });
    const fromEmail = this.configService.get<string>('notifications.from', {
      infer: true,
    });

    this.resend = new Resend(resendApiKey);
    this.sendEmail = sendEmail;
    this.fromEmail = fromEmail;
  }

  async send(notificationDto: NotificationDto): Promise<void> {
    let email = this.createEmail(notificationDto);
    if (!this.sendEmail) {
      // this.logger.log(email, 'EmailNotificationStrategy');
      return;
    }
    await this.resend.emails.send(email);
  }

  async sendBatch(notificationDtos: NotificationDto[]): Promise<void> {
    let emails: any = [];
    for (let notificationDto of notificationDtos) {
      emails.push(this.createEmail(notificationDto));
    }
    if (!this.sendEmail) {
      // this.logger.log(emails, 'EmailNotificationStrategy');
      return;
    }

    await this.resend.batch.send(emails);
  }

  private createEmail(notificationDto: NotificationDto): any {
    const { to, subject, message } = notificationDto;
    return {
      from: this.fromEmail,
      to,
      subject,
      react: message,
    };
  }
}
