import { Trash } from "../../entities/Trash";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { QueryAllTasks } from "../query-cases/Get-all";
import { CreateTrashResponse } from "./Create-trash";

export class CreateAllTrash {
  constructor(private trashRepository: PrismaTrashRepository) {}

  async execute(): Promise<CreateTrashResponse> {
    const queryAllTasks = new QueryAllTasks(new PrismaTaskQueryRepository());
    const { tasks } = Object(await queryAllTasks.execute());

    return tasks.map(async (task: Trash) => {
      const { id, title, content, date, done, createdAt } = task;
      const trashBody = new Trash(
        {
          title: title,
          content: String(content),
          date: String(date),
          done: done,
          createdAt: createdAt,
        },
        String(id)
      );

      return {
        createTrash: await this.trashRepository.create(trashBody),
      };
    });
  }
}
