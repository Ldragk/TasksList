import { Task } from "../../entities/Task";
import { Description } from "../../entities/task-entites/Description";
import { LimitDay } from "../../entities/task-entites/LimiteDay";
import { LimitMonth } from "../../entities/task-entites/LimiteMonth";
import { LimitYear } from "../../entities/task-entites/LimitYear";
import { Title } from "../../entities/task-entites/Title";
import { TaskBody } from "../../http/dtos/create-task-body";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class FullUpdate {
  static async execute(body: TaskBody, taskId: string) {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    let task: Task = await prismaQueryRepository.findeById(taskId);

    task.title = new Title(body.title);
    task.description = new Description(body.description);
    task.limitDay = new LimitDay(body.limitDay);
    task.limitMonth = new LimitMonth(body.limitMonth);
    task.limitYear = new LimitYear(body.limitYear);
    task.done = body.done;
    task.updated();

    const prismaManageRepository = new PrismaManageRepository();
    return await prismaManageRepository.save(task);
  }
}
