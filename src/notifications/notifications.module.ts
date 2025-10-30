import { Module } from '@nestjs/common';

import { EmailNotificationStrategy } from 'src/notifications/strategies';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  providers: [NotificationsService, EmailNotificationStrategy],
  exports: [NotificationsService],
})
export class NotificationsModule {}
