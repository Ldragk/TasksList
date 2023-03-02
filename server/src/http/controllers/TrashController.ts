import { Trash } from "../../entities/Trash";
import { DeleteAllTrash } from "../../use-cases/delete-cases/Delete-all-trash";
import { DeleteTrash } from "../../use-cases/delete-cases/Delete-trash";
import { AllTrash } from "../../use-cases/trash-cases/Get-all-trash";
import { TrashViewModel } from "../view-models/Trash-view-model";

export class TrashTasks {
  async queryAllTrashTasks(
    req: Request,
    res: {
      json: (arg0: TrashViewModel) => Promise<Trash[]>;
    }
  ) {
    const { trash } = await AllTrash.execute();
    return { get: res.json(trash.map(TrashViewModel.toHTTP)) };
  }

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
