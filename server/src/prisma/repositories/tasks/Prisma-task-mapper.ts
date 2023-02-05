import { Task as RawTask } from "@prisma/client";
import { Task } from "../../../entities/Task";

export class PrismaTaskMapper {
  static toPrisma(notification: Task) {
    return {
      id: notification.id,
      title: notification.title,
      description: notification.description,
      limitDay: notification.limitDay,
      limitMonth: notification.limitMonth,
      limitYear: notification.limitYear,
      date: notification.date,
      done: notification.done,
      creatAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }

  static toDomain(raw: RawTask): Task {
    return new Task(
      {
        title: raw.title,
        description: raw.description,
        limitDay: raw.limitDay,
        limitMonth: raw.limitMonth,
        limitYear: raw.limitYear,
        date: raw.date,
        done: raw.done,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
}
