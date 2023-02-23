import { Notification } from "../entities/Notification";

export abstract class NotificationRepository {
  abstract findNotifications(done: boolean): Promise<Notification[]>;
}
