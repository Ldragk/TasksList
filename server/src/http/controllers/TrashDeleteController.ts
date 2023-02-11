import { Prisma } from "@prisma/client";
import { DeleteAllTrash } from "../../use-cases/delete-cases/Delete-all-trash";
import { DeleteTrash } from "../../use-cases/delete-cases/Delete-trash";
import { CreateTrash } from "../../use-cases/trash-cases/Create-trash";
import { TaskBody } from "../dtos/create-task-body";

export class TrashDelete {
  async deletedTrashTask(
    req: { params: { id: string } },
    res: { json: (arg0: TaskBody | object) => Promise<TaskBody> }
  ) {
    const idDeleted: string = req.params.id;    
    return res.json(await DeleteTrash.execute(idDeleted));
  }

  async deletedAllTrashTasks(
    req: Request,
    res: { json: (arg0: Prisma.BatchPayload | object) => Promise<TaskBody> }
  ) {
    return res.json(await DeleteAllTrash.execute());
  }
}
