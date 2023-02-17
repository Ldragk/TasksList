import { Task } from "../../entities/Task";
import { Description } from "../../entities/task-entites/Description";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";

interface CreateTaskRequest {
  title: string;
  description: string;
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
    const { title, description, limitDay, limitMonth, limitYear, done } = props;
    const task = new Task({
      title: title,
      description: new Description(description),
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
