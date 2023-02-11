import { Trash } from "../../entities/Trash";
import { CreateTrash } from "../../use-cases/trash-cases/Create-trash";
import { AllTrashs } from "../../use-cases/trash-cases/Get-all-trash";
import { TrashBody } from "../dtos/create-trash-body";

export class TrashTasks {  

  async consultAllTrashTasks(
    req: Request,
    res: {
      json: (arg0: Trash[]) => Promise<TrashBody[]>;
    }
  ): Promise<TrashBody[]> {
    return res.json(await AllTrashs.execute());
  }
}
