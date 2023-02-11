import { TaskBody } from "../../http/dtos/create-task-body";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";

export class DeleteTask {
  static async execute(id: string): Promise<TaskBody | object> {
    const prismaDeleteRepository = new PrismaDeleteRepository();

    return !!(await prismaDeleteRepository.delete(id))
      ? { message: "Task not found" }
      : await prismaDeleteRepository.delete(id);
  }
}
