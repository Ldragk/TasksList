import { Task } from "@src/entities/task";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { ManageRepository } from "@src/repositories/manage-repository";
import Cache from "@src/util/cache";
import { CacheService } from "../cache-service";

interface EditTaskRequest {
  title: string;
  content: string;
  date: string;
  done?: boolean;
}

interface EditTaskResponse {
  task: Task;
}

export class FullUpdate extends CacheService{
  constructor(private manageRepository: ManageRepository) {
    super()
   }

  async execute(
    taskId: string,
    userId: string,
    body: EditTaskRequest    
  ): Promise<EditTaskResponse> {
    const task: Task = await this.manageRepository.findById(taskId, userId);
    const { title, content, date, done } = body;

    task.updated();
    const taskUpdated = new Task({
      title: title || task.title,
      content: content ?? task.content,
      date: new LimitDate(date) ?? task.date,
      done: done ?? task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userId: task.userId,
    }, task.id);

    await this.manageRepository.save(taskUpdated, userId);

    this.cached(taskUpdated, taskId, userId)
    return { task: taskUpdated };
  }

  cached(value: Task, id: string, userId: string) {
    const cachedTasks = this.cache.find<Task>(`task:${userId}`, id, userId);
    cachedTasks?.push(value)
    this.cache.set<Task>(`task:${userId}`, cachedTasks as Task[], userId);
  }
}
