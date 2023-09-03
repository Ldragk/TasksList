import { Task } from "@src/entities/task";
import { Trash } from "@src/entities/trash";
import { DeleteRepository } from "@src/repositories/delete-repository";
import Cache from "@src/util/cache";
import { CacheService } from "../cache-service";

export interface DeletedTaskResponse {
  deleteTrash: void;
  createTrash?: Trash;
}

export class DeleteTask extends CacheService{
  constructor(private deleteRepository: DeleteRepository) { 
    super()
  }

  async execute(userId: string, id: string): Promise<DeletedTaskResponse> {
    const deletedTasks = await this.deleteRepository.delete(userId, id)

    this.cached(id, userId)
    return { deleteTrash: deletedTasks };
  }

  cached(id: string, userId: string) {
    const cachedTasks = this.cache.find<Task>(`task:${userId}`, id, userId);
    this.cache.set<Task>(`task:${userId}`, cachedTasks as Task[], userId);
  }
}
