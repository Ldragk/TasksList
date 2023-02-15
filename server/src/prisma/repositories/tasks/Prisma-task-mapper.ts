import { Task as RawTask } from "@prisma/client";
import { Task } from "../../../entities/Task";
import { Description } from "../../../entities/task-entites/Description";
import { LimitDay } from "../../../entities/task-entites/LimiteDay";
import { LimitMonth } from "../../../entities/task-entites/LimiteMonth";
import { LimitYear } from "../../../entities/task-entites/LimitYear";
import { Title } from "../../../entities/task-entites/Title";

export class PrismaTaskMapper {
  static toPrisma(task: Task) {
    return {
      id: task.id,
      title: task.title.value,
      description: task.description.value,
      limitDay: task.limitDay.value,
      limitMonth: task.limitMonth.value,
      limitYear: task.limitYear.value,      
      done: task.done,
      createdAt: task.createdAt,
    };
  }

  static toDomain(raw: RawTask): Task {
    return new Task(
      {
        title: new Title(raw.title),
        description: new Description(raw.description),
        limitDay: new LimitDay(raw.limitDay),
        limitMonth: new LimitMonth(raw.limitMonth),
        limitYear: new LimitYear(raw.limitYear),        
        done: raw.done,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
}
