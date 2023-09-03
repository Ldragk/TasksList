import { Trash } from "@src/entities/trash";
import { DeleteRepository } from "@src/repositories/delete-repository";
import Cache from "@src/util/cache"
import { CacheService } from "../cache-service";

interface DeleteTrashResponse {
  deleteTrash: void;
}

export class DeleteTrash extends CacheService {
  constructor(private deleteTrashRepository: DeleteRepository) { 
    super()
  }
  async execute(userId: string, id: string): Promise<DeleteTrashResponse> {
    this.cached(this.cache, id, userId)
    return { deleteTrash: await this.deleteTrashRepository.delete(userId, id) };
  }

  cached(cache: typeof Cache, id: string, userId: string) {
    const cachedTrashWithoutTheDeleted = cache.find<Trash>(`trash:${userId}`, id, userId);
    cache.set<Trash>(`trash:${userId}`, cachedTrashWithoutTheDeleted as Trash[], userId);
  }
}
