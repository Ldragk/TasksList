import { DeleteRepository } from "@src/repositories/delete-repository";

interface DeleteTrashResponse {
  deleteTrash: void;
}

export class DeleteTrash {
  constructor(private deleteTrashRepository: DeleteRepository) {}
  async execute(id: string): Promise<DeleteTrashResponse> {
    return { deleteTrash: await this.deleteTrashRepository.delete(id) };
  }
}
