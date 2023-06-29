import { DeleteRepository } from "@src/repositories/delete-repository";

interface DeleteAllTrashResponse {
  deleteTrash: void;
}

export class DeleteAllTrash {
  constructor(private deleteTrashRepository: DeleteRepository) {}
  async execute(userId: string): Promise<DeleteAllTrashResponse> {
    return { deleteTrash: await this.deleteTrashRepository.deleteAll(userId) };
  }
}
