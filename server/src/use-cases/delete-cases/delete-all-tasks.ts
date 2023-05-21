import { DeleteRepository } from "../../repositories/delete-repository";
import { DeletedTaskResponse } from "./delete-task";

export class DeleteAllTasks {
  constructor(private deleteRepository: DeleteRepository) {}

  async execute(): Promise<DeletedTaskResponse> {
   

    return { deleteTrash: await this.deleteRepository.deleteAll() };
  }
}
