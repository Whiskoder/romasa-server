import { Injectable } from '@nestjs/common';

import { NotificationDto } from 'src/notifications/dto';
import { EmailNotificationStrategy } from 'src/notifications/strategies';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly emailNotificationStrategy: EmailNotificationStrategy,
  ) {}

  async notify(dto: NotificationDto): Promise<void> {
    await this.emailNotificationStrategy.send(dto);
  }

  async batchNotify(dtos: NotificationDto[]): Promise<void> {
    await this.emailNotificationStrategy.sendBatch(dtos);
  }
}
