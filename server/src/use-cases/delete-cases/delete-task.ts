import { Trash } from "@src/entities/trash";
import { DeleteRepository } from "@src/repositories/delete-repository";

export interface DeletedTaskResponse {
  deleteTrash: void;
  createTrash?: Trash;
}

export class DeleteTask {
  constructor(private deleteRepository: DeleteRepository) {}
  async execute(id: string): Promise<DeletedTaskResponse> {
    return { deleteTrash: await this.deleteRepository.delete(id) };
  }
}
