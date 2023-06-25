import { Notification } from "@src/entities/notification";
import { NotificationRepository } from "../notification-repository";
import { InMemoryManageRepository } from "./in-memory-manage-repository";

export class InMemoryNotificationRepository
  extends InMemoryManageRepository
  implements NotificationRepository
{
  async findNotifications(userId:string, done: boolean): Promise<Notification[]> {
    const tasks = this.tasks.filter((task) => task.done === done);

    return tasks.map((task) => {
      const notification = {
        title: task.title,
        date: task.date.value,
        id: task.id,
      };
      return notification as Notification;
    });
  }
}
