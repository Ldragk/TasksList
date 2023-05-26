import { Task } from "@src/entities/task";
import { Content } from "@src/entities/task-entities/content";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { PrismaManageRepository } from "@src/prisma/repositories/tasks/Prisma-manage-repository";
import { ManageRepository } from "@src/repositories/manage-repository";

interface CreateTaskRequest {
  title: string;
  content: string;
  date: string;
  done?: boolean;
}

interface CreateTaskResponse {
  task: Task;
}

export class CreateTask {
  constructor(private manageRepository: ManageRepository) {}

  async execute(props: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { title, content, date, done } = props;
    const task = new Task({
      title: title,
      content: new Content(content),
      date: new LimitDate(date),
      done,
    });

    await this.manageRepository.create(task);

    return { task: task };
  }
}
