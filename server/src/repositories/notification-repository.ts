import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract findNotifications(
    userId: string,
    done: boolean
  ): Promise<Notification[]>;
}
