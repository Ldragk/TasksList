import { Task as RawTask } from "@prisma/client";
import { Task } from "../../../entities/Task";
import { Content } from "../../../entities/task-entites/Content";

export class PrismaTaskMapper {
  static toPrisma(task: Task) {
    return {
      id: task.id,
      title: task.title,
      content: task.content.value,
      limitDay: task.limitDay,
      limitMonth: task.limitMonth,
      limitYear: task.limitYear,
      done: task.done,
      createdAt: task.createdAt,
    };
  }

  static toDomain(raw: RawTask): Task {
    return new Task(
      {
        title: raw.title,
        content: new Content(raw.content),
        limitDay: raw.limitDay,
        limitMonth: raw.limitMonth,
        limitYear: raw.limitYear,
        done: raw.done,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
}
