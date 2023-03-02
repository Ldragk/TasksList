import { PrismaDeleteTrashRepository } from "../../prisma/repositories/trash/Prisma-delete-trash-repository";
import { DeleteRepository } from "../../repositories/Delete-repository";

interface DeleteTrashResponse {
  deleteTrash: void;
}

export class DeleteTrash {
  constructor(private deleteTrashRepository: DeleteRepository) {}
  async execute(id: string): Promise<DeleteTrashResponse> {
    return { deleteTrash: await this.deleteTrashRepository.delete(id) };
  }
}
