import { Task } from "@src/entities/task";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { ManageRepository } from "@src/repositories/manage-repository";

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

export class CreateTask {
  constructor(private manageRepository: ManageRepository) { }

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

    return { task: task };
  }
}
