import { DeleteRepository } from "@src/repositories/delete-repository";
import { DeletedTaskResponse } from "./delete-task";

export class DeleteAllTasks {
  constructor(private deleteRepository: DeleteRepository) { }

  async execute(userId: string): Promise<DeletedTaskResponse> {
    return { deleteTrash: await this.deleteRepository.deleteAll(userId) };
  }
}
