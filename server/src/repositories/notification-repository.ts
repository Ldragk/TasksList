import { Notification } from "../entities/notification";

export abstract class NotificationRepository {
  abstract findNotifications(done: boolean): Promise<Notification[]>;
}
