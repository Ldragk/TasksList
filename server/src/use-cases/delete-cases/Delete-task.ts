import { Trash } from "../../entities/Trash";
import { DeleteRepository } from "../../repositories/Delete-repository";

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
