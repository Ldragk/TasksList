import { Task } from "../../entities/Task";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { ManageRepository } from "../../repositories/Manage-repository";

interface EditTaskResponse {
  task: Task;
}

export class TaskStatus {
  constructor(private manageRepository: ManageRepository) {}

  async execute(taskId: string): Promise<EditTaskResponse> {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    const task: Task = await prismaQueryRepository.findeById(taskId);

    task.done === false ? (task.done = true) : (task.done = false);
    task.updated();

    await this.manageRepository.saveCondition(task);
    return { task: task };
  }
}
