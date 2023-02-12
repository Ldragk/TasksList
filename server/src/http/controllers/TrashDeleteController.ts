import { Prisma } from "@prisma/client";
import { DeleteAllTrash } from "../../use-cases/delete-cases/Delete-all-trash";
import { DeleteTrash } from "../../use-cases/delete-cases/Delete-trash";
import { TaskBody } from "../dtos/create-task-body";

export class TrashDelete {
  async deletedTrashTask(
    req: { params: { id: string } },
    res: { json: (arg0: TaskBody) => Promise<TaskBody> }
  ) {
    const id: string = req.params.id;
    return res.json(await DeleteTrash.execute(id));
  }

  async deletedAllTrashTasks(
    req: Request,
    res: { json: (arg0: Prisma.BatchPayload) => Promise<TaskBody> }
  ) {
    return res.json(await DeleteAllTrash.execute());
  }
}
