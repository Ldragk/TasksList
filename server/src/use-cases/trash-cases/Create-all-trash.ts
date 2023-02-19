import { Description } from "../../entities/task-entites/Content";
import { Trash } from "../../entities/Trash";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { QueryAllTasks } from "../query-cases/Get-all";
import { CreateTrashResponse } from "./Create-trash";

export class CreateAllTrash {
  static async execute(): Promise<CreateTrashResponse> {
    const prismaTrashRepository = new PrismaTrashRepository();

    const allTasks = await QueryAllTasks.execute();

    const tasks = Object(allTasks);

    return tasks.map(async (task: Trash) => {
      const {
        id,
        title,
        description,
        limitDay,
        limitMonth,
        limitYear,
        done,
        createdAt,
      } = task;
      const trashBody: Trash = new Trash(
        {
          title: title,
          description: String(description),
          limitDay: limitDay,
          limitMonth: limitMonth,
          limitYear: limitYear,
          done: done,
          createdAt: createdAt,
        },
        String(id)
      );
      
      return { createTrash: await prismaTrashRepository.create(trashBody) };
    });
  }
}
