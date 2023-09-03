import { Task } from "@src/entities/task";
import { QueryRepository } from "@src/repositories/get-repository";
import Cache from "@src/util/cache"
import { CacheService } from "../cache-service";

enum CheckCache {
  NoCache = 1,
}

export interface GetTasksResponse {
  tasks: Task[];
}

export class QueryAllTasks extends CacheService{
  constructor(private findRecipientRepository: QueryRepository) {
    super()
   }

  public async execute(userId: string): Promise<GetTasksResponse> {
    const cached = this.cached(userId)

    if (cached === CheckCache.NoCache) {
      const tasks = await this.findRecipientRepository.findAllTasks(userId)
      this.cache.set(`task:${userId}`, tasks, userId);
      return { tasks: tasks };
    }    
    return { tasks: cached as Task[] }
  }

  cached(userId: string) {
    const cachedTasks = this.cache.get<Task>(`task:${userId}`, userId);

    if (cachedTasks) {
      return cachedTasks;
    }
    return CheckCache.NoCache;
  }
}
