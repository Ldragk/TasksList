import { Task } from "../../../entities/Task";
import { CreateTaskBody } from "../../../http/dtos/create-task-body";
import { PrismaManageRepository } from "../../../prisma/repositories/tasks/Prisma-manage-repository";

export class CreateTask {
  constructor() {}

  async createTask(props: CreateTaskBody, id: string): Promise<void> {
    const task = new Task({     
      title: props.title,
      description: props.description,
      limitDay: props.limitDay,
      limitMonth: props.limitMonth,
      limitYear: props.limitYear,
      date: `${props.limitMonth}/${props.limitDay}/${props.limitYear}`,
      done: props.done,
    //   createdAt: new Date(),
    //   updatedAt: props.updatedAt,
    });

    const prismaManageRepository = new PrismaManageRepository();

    return await prismaManageRepository.create(task);
  }
}
