import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";
import { DeletedTaskResponse } from "./Delete-task";

export class DeleteAllTasks {
  constructor(private deleteRepository: PrismaDeleteRepository) {}

  async execute(): Promise<DeletedTaskResponse> {
   

    return { deleteTrash: await this.deleteRepository.deleteAll() };
  }
}
