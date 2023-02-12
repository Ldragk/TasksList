import { Task } from "../../entities/Task";
import { Trash } from "../../entities/Trash";
import { TrashBody } from "../../http/dtos/create-trash-body";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { QueryAllTasks } from "../query-cases/Get-all";

export class CreateTrash {
  static async execute(taskId: string): Promise<any> {
    const prismaQueryRepository = new PrismaTaskQueryRepository();

    const prismaTrashRepository = new PrismaTrashRepository();

    if (taskId === "") {
      const allTasks: Task[] = await QueryAllTasks.execute();
      const tasks = Object(allTasks);

      tasks.map((task: Trash) => {
        const taskBody: Trash = new Trash(
          {
            title: task.title,
            description: task.description,
            limitDay: task.limitDay,
            limitMonth: task.limitMonth,
            limitYear: task.limitYear,
            done: task.done,
            createdAt: task.createdAt,
          },
          task.id
        );
        return prismaTrashRepository.create(taskBody);
      });
    } else {
      const task: Task = await prismaQueryRepository.findeById(taskId);
      const taskBody: Trash = new Trash(
        {
          title: task.title,
          description: task.description,
          limitDay: task.limitDay,
          limitMonth: task.limitMonth,
          limitYear: task.limitYear,
          done: task.done,
          createdAt: task.createdAt,
        },
        task.id
      );
      return await prismaTrashRepository.create(taskBody);
    }
  }
}
