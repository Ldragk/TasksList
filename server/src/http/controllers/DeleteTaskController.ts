import { Prisma } from "@prisma/client";
import { Task } from "../../entities/Task";
import { DeleteAllTasks } from "../../use-cases/delete-cases/Delete-all-tasks";
import { DeleteTask } from "../../use-cases/delete-cases/Delete-task";
import { CreateTrash } from "../../use-cases/trash-cases/Create-trash";
import { TaskBody } from "../dtos/create-task-body";

export class DeleteTasks {
  async deleteTask(
    req: { params: { id: string } },
    res: { json: (arg0: TaskBody) => Promise<Task> }
  ) {
    const id: string = req.params.id;

    const teste = await (DeleteTask.execute(id), CreateTrash.execute(id));

    return res.json(teste);
  }

  async deletedAllTasks(
    req: Request,
    res: { json: (arg0: Prisma.BatchPayload) => Promise<Task> }
  ) {
    return res.json(await DeleteAllTasks.execute());
  }
}
