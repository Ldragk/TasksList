import { TaskBody } from "../../http/dtos/create-task-body";
import { PrismaDeleteTrashRepository } from "../../prisma/repositories/tasks/Prisma-delete-trash-repository";

export class DeleteTrash {
  static async execute(id: string): Promise<TaskBody | object> {
    const prismaDeleteRepository = new PrismaDeleteTrashRepository();

    return !!(await prismaDeleteRepository.delete(id))
      ? { message: "Task not found" }
      : await prismaDeleteRepository.delete(id);
  }
}
