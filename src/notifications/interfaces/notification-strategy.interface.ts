import { NotificationDto } from 'src/notifications/dto';

export interface INotificationStrategy {
  send(notificationDto: NotificationDto): Promise<void>;

  sendBatch(notificationDtos: NotificationDto[]): Promise<void>;
}
