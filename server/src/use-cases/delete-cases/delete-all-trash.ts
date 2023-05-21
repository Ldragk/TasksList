import { DeleteRepository } from "../../repositories/delete-repository";

interface DeleteAllTrashResponse {
  deleteTrash: void;
}

export class DeleteAllTrash {
  constructor(private deleteTrashRepository: DeleteRepository) {}
  async execute(): Promise<DeleteAllTrashResponse> {
    return { deleteTrash: await this.deleteTrashRepository.deleteAll() };
  }
}
