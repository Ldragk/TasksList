import { Prisma } from "@prisma/client";
import { Task } from "../../entities/Task";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";
import { DeleteAllTasks } from "../../use-cases/delete-cases/Delete-all-tasks";
import { DeleteTask } from "../../use-cases/delete-cases/Delete-task";
import { TaskBody } from "../dtos/create-task-body";

export class DeleteTasks {
  async deleteTask(
    req: { params: { id: string } },
    res: { json: (arg0: TaskBody | object) => Promise<Task> }
  ) {
    const id: string = req.params.id;
    const deleted = await DeleteTask.execute(id);

    return res.json(deleted);
  }

  async deletedAllTasks(
    req: Request,
    res: { json: (arg0: Prisma.BatchPayload | object) => Promise<Task> }
  ) {
    return res.json(await DeleteAllTasks.execute());
  }
}
