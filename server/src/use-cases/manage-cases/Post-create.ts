import { Task } from "../../entities/Task";
import { Content } from "../../entities/task-entities/Content";
import { LimitDate } from "../../entities/task-entities/LimitDate";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";

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
  static async execute(props: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { title, content, date, done } = props;
    const task = new Task({
      title: title,
      content: new Content(content),
      date: new LimitDate(date),
      done,
    });
    const prismaManageRepository = new PrismaManageRepository();

    await prismaManageRepository.create(task);

    return { task: task };
  }
}
