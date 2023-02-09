import { Task as RawTask } from "@prisma/client";
import { Task } from "../../../entities/Task";

export class PrismaTaskMapper {
  static toPrisma(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      limitDay: task.limitDay,
      limitMonth: task.limitMonth,
      limitYear: task.limitYear,
      date: task.date,
      done: task.done,
      createdAt: task.createdAt,      
    };
  }

  static toDomain(raw: RawTask): Task {
    return new Task({      
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
    raw.id,
    );
  }
}
