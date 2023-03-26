import { Trash } from "../../entities/Trash";
import { PrismaDeleteTrashRepository } from "../../prisma/repositories/trash/Prisma-delete-trash-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { DeleteAllTrash } from "../../use-cases/delete-cases/Delete-all-trash";
import { DeleteTrash } from "../../use-cases/delete-cases/Delete-trash";
import { AllTrash } from "../../use-cases/trash-cases/Get-all-trash";
import { TrashViewModel } from "../view-models/Trash-view-model";

export class TrashTasks {
  async findAllTrashTasks(
    _: Request,
    res: {
      json: (arg0: TrashViewModel) => Promise<Trash[]>;
    }
  ) {
    const allTrash = new AllTrash(new PrismaTrashRepository());
    const { trash } = await allTrash.execute();
    return { get: res.json(trash.map(TrashViewModel.toHTTP)) };
  }

  async deletedTrashTask(
    req: { params: { id: string } },
    res: { json: (arg0: void) => Promise<Trash> }
  ) {
    const id: string = req.params.id;
    const deleted = new DeleteTrash(new PrismaDeleteTrashRepository());
    const { deleteTrash } = await deleted.execute(id);

    return { delete: res.json(deleteTrash) };
  }

  async deletedAllTrashTasks(
    _: Request,
    res: { json: (arg0: void) => Promise<Trash> }
  ) {
    const deleteAllTrash = new DeleteAllTrash(
      new PrismaDeleteTrashRepository()
    );
    const { deleteTrash } = await deleteAllTrash.execute();

    return { delete: res.json(deleteTrash) };
  }
}
