import { Trash } from "@src/entities/trash";
import { TrashRepository } from "@src/repositories/trash-repository";
import Cache from "@src/util/cache"
import { CacheService } from "../cache-service";

interface GetTrashResponse {
  trash: Trash[];
}

enum CheckCache {
  NoCache = 1,
}

export class AllTrash extends CacheService {
  constructor(private trashRepository: TrashRepository) {
    super()
  }

  async execute(userId: string): Promise<GetTrashResponse> {
    const cached = this.cached(userId)
    if (cached === CheckCache.NoCache) {
      const trash = await this.trashRepository.findAllTrash(userId)

      this.cache.set(`trash:${userId}`, trash, userId)
      return { trash: trash };
    }
    return { trash: cached as Trash[] }
  }

  cached(userId: string) {
    const cachedTasks = this.cache.get<Trash>(`trash:${userId}`, userId);

    if (cachedTasks) {
      return cachedTasks;
    }
    return CheckCache.NoCache;
  }
}
