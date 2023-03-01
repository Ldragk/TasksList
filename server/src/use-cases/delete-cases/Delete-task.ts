import { Trash } from "../../entities/Trash";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";

export interface DeletedTaskResponse {
  deleteTrash: void;
  createTrash?: Trash;
}

export class DeleteTask {
  constructor(private deleteRepository: PrismaDeleteRepository) {}
  async execute(id: string): Promise<DeletedTaskResponse> {
    return { deleteTrash: await this.deleteRepository.delete(id) };
  }
}
