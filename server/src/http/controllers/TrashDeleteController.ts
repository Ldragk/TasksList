import { Trash } from "../../entities/Trash";
import { DeleteAllTrash } from "../../use-cases/delete-cases/Delete-all-trash";
import { DeleteTrash } from "../../use-cases/delete-cases/Delete-trash";

export class TrashDelete {
  async deletedTrashTask(
    req: { params: { id: string } },
    res: { json: (arg0: void) => Promise<Trash> }
  ) {
    const id: string = req.params.id;
    const { deleteTrash } = await DeleteTrash.execute(id);

    return { delete: res.json(deleteTrash) };
  }

  async deletedAllTrashTasks(   
    req: Request,
    res: { json: (arg0: void) => Promise<Trash> }
  ) {
    const { deleteTrash } = await DeleteAllTrash.execute();

    return { delete: res.json(deleteTrash) };
  }
}
