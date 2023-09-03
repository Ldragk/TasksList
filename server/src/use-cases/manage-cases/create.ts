import { Task } from "@src/entities/task";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { ManageRepository } from "@src/repositories/manage-repository";
import Cache from "@src/util/cache";
import { CacheService } from "../cache-service";

interface CreateTaskRequest {
  title: string;
  content: string;
  date: string;
  done?: boolean;
  userId: string;
}

interface CreateTaskResponse {
  task: Task;
}

export class CreateTask extends CacheService{
  constructor(private manageRepository: ManageRepository) {
    super()
   }

  async execute(props: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { title, content, date, done, userId } = props;
    const task = new Task({
      title: title,
      content: content,
      date: new LimitDate(date),
      done,
      userId
    });

    await this.manageRepository.create(task);
    this.cached(task, userId)

    return { task: task };
  }

  cached(value: Task, userId: string) {
    const cachedTasks = this.cache.get<Task>(`task:${userId}`, userId);
    cachedTasks?.push(value)    
    this.cache.set<Task>(`task:${userId}`, cachedTasks as Task[], userId);
  }
}
