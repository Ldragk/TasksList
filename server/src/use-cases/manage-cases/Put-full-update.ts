import { Task } from "../../entities/Task";
import { Description } from "../../entities/task-entites/Description";
import { TaskBody } from "../../http/dtos/create-task-body";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

interface EditTaskRequest {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
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

    const { title, description, limitDay, limitMonth, limitYear, done } = body;

    task.title = title ?? task.title;
    task.description = new Description(description) ?? task.description;
    task.limitDay = limitDay ?? task.limitDay;
    task.limitMonth = limitMonth ?? task.limitMonth;
    task.limitYear = limitYear ?? task.limitYear;
    task.done = done ?? task.done;
    task.updated();

    const prismaManageRepository = new PrismaManageRepository();
    await prismaManageRepository.save(task);
    return { task: task };
  }
}
