import { Prisma } from "@prisma/client";
import { DeleteRepository } from "../../repositories/Delete-repository";

interface DeleteAllTrashResponse {
  deleteTrash: void;
}

export class DeleteAllTrash {
  constructor(private deleteTrashRepository: DeleteRepository) {}
  async execute(): Promise<DeleteAllTrashResponse> {
    return { deleteTrash: await this.deleteTrashRepository.deleteAll() };
  }
}
