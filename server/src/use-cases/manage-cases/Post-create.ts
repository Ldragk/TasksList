import { Task } from "../../entities/Task";
import { TaskBody } from "../../http/dtos/create-task-body";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";

export class CreateTask {
  static async execute(props: TaskBody, id: string): Promise<TaskBody> {
    const task = new Task(
      {
        title: props.title,
        description: props.description,
        limitDay: props.limitDay,
        limitMonth: props.limitMonth,
        limitYear: props.limitYear,
        done: props.done,
      },
      id
    );
    const prismaManageRepository = new PrismaManageRepository();

    return await prismaManageRepository.create(task);
  }
}
