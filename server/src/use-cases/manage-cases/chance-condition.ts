import { Task } from "@src/entities/task";
import { ManageRepository } from "@src/repositories/manage-repository";
import Cache from "@src/util/cache";
import { CacheService } from "../cache-service";

interface EditTaskResponse {
  task: Task;
}

export class TaskStatus extends CacheService{
  constructor(private manageRepository: ManageRepository) {
    super()
   }

  async execute(taskId: string, userId: string): Promise<EditTaskResponse> {
    const task = await this.manageRepository.findById(taskId, userId);

    task.done === false ? (task.done = true) : (task.done = false);
    task.updated();
    
    await this.manageRepository.saveCondition(task, userId);
    
    this.cached(task, taskId, userId)
    return { task: task };
  }

  cached(value: Task, id: string, userId: string) {
    const cachedTasks = this.cache.find<Task>(`task:${userId}`, id, userId);
    cachedTasks?.push(value)
    this.cache.set<Task>(`task:${userId}`, cachedTasks as Task[], userId);
  }
}
