import { Trash } from "../../entities/Trash";
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
}
