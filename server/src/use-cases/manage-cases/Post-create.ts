import { Task } from "../../entities/Task";
import { Description } from "../../entities/task-entites/Description";
import { LimitDay } from "../../entities/task-entites/LimiteDay";
import { LimitMonth } from "../../entities/task-entites/LimiteMonth";
import { LimitYear } from "../../entities/task-entites/LimitYear";
import { Title } from "../../entities/task-entites/Title";
import { TaskBody } from "../../http/dtos/create-task-body";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";

export class CreateTask {
  static async execute(props: TaskBody, id: string): Promise<TaskBody> {
    const task = new Task(
      {
        title: new Title(props.title),
        description: new Description(props.description),
        limitDay: new LimitDay(props.limitDay),
        limitMonth: new LimitMonth(props.limitMonth),
        limitYear: new LimitYear(props.limitYear),
        done: props.done,
      },
      id
    );
    const prismaManageRepository = new PrismaManageRepository();

    return await prismaManageRepository.create(task);
  }
}
