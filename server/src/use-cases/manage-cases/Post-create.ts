import { Task } from "../../entities/Task";
import { Content } from "../../entities/task-entites/Content";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";

interface CreateTaskRequest {
  title: string;
  content: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  done?: boolean;
}

interface CreateTaskResponse {
  task: Task;
}

export class CreateTask {
  static async execute(props: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { title, content, limitDay, limitMonth, limitYear, done } = props;
    const task = new Task({
      title: title,
      content: new Content(content),
      limitDay: limitDay,
      limitMonth: limitMonth,
      limitYear: limitYear,
      done,
    });
    const prismaManageRepository = new PrismaManageRepository();

    await prismaManageRepository.create(task);

    return { task: task };
  }
}
