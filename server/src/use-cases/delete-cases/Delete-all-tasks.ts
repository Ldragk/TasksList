import { DeleteRepository } from "../../repositories/Delete-repository";
import { DeletedTaskResponse } from "./Delete-task";

export class DeleteAllTasks {
  constructor(private deleteRepository: DeleteRepository) {}

  async execute(): Promise<DeletedTaskResponse> {
   

    return { deleteTrash: await this.deleteRepository.deleteAll() };
  }
}
