import { Task as RawTask } from "@prisma/client";
import { Task } from "../../../entities/Task";
import { Content } from "../../../entities/task-entities/Content";
import { LimitDate } from "../../../entities/task-entities/LimitDate";

export class PrismaTaskMapper {
  static toPrisma(task: Task) {
    return {
      id: task.id,
      title: task.title,
      content: task.content.value,
      date: task.date.value,
      done: task.done,
      createdAt: task.createdAt,
    };
  }

  static toDomain(raw: RawTask): Task {
    return new Task(
      {
        title: raw.title,
        content: new Content(raw.content),
        date: new LimitDate(raw.date),
        done: raw.done,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
}
