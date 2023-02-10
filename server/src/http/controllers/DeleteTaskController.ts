import { Prisma } from "@prisma/client";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";
import { TaskBody } from "../dtos/create-task-body";

export class DeleteTask {
  async deletedTask(
    req: { params: { id: string } },
    res: { json: (arg0: TaskBody) => Promise<TaskBody> }
  ) {
    const idDeleted: string = req.params.id;
    const prismaDeleteRepository = new PrismaDeleteRepository();

    return res.json(await prismaDeleteRepository.delete(idDeleted));
  }

  async deletedAllTasks(
    req: Request,
    res: { json: (arg0: Prisma.BatchPayload) => Promise<TaskBody> }
  ) {
    const prismaDeleteRepository = new PrismaDeleteRepository();

    return res.json(await prismaDeleteRepository.deleteAll());
  }
}
