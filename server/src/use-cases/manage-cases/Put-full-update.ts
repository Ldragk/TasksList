import { Task } from "../../entities/Task";
import { Content } from "../../entities/task-entites/Content";
import { LimitDate } from "../../entities/task-entites/LimitDate";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

interface EditTaskRequest {
  title: string;
  content: string;
  date: string;
  done?: boolean;
}

interface EditTaskResponse {
  task: Task;
}

export class FullUpdate {
  static async execute(
    taskId: string,
    body: EditTaskRequest
  ): Promise<EditTaskResponse> {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    let task: Task = await prismaQueryRepository.findeById(taskId);

    const { title, content, date, done } = body;

    task.title = title ?? task.title;
    task.content = new Content(content) ?? task.content;
    task.date = new LimitDate(date) ?? task.date;
    task.done = done ?? task.done;
    task.updated();

    const prismaManageRepository = new PrismaManageRepository();
    await prismaManageRepository.save(task);
    return { task: task };
  }
}
