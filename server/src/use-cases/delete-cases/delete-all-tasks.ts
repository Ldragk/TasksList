import { DeleteRepository } from "@src/repositories/delete-repository";
import { DeletedTaskResponse } from "./delete-task";
import { CacheService } from "../cache-service";

export class DeleteAllTasks extends CacheService {
  constructor(private deleteRepository: DeleteRepository) {
    super()
  }

  async execute(userId: string): Promise<DeletedTaskResponse> {
    const deletedTasks = await this.deleteRepository.deleteAll(userId)
    this.cache.del(`task:${userId}`)
    return { deleteTrash: deletedTasks };
  }
}
