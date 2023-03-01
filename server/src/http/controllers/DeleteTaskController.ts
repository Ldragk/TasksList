import { Trash } from "../../entities/Trash";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { DeleteAllTasks } from "../../use-cases/delete-cases/Delete-all-tasks";
import { DeleteTask } from "../../use-cases/delete-cases/Delete-task";
import { CreateAllTrash } from "../../use-cases/trash-cases/Create-all-trash";
import { CreateTrash } from "../../use-cases/trash-cases/Create-trash";
import { TrashViewModel } from "../view-models/Trash-view-model";

export class DeleteTasks {
  async deleteTask(
    req: { params: { id: string } },
    res: { json: (arg0: TrashViewModel | void) => Promise<Trash> }
  ) {
    const id: string = req.params.id;
    
    const create = new CreateTrash(new PrismaTrashRepository());
    const deleteTask = new DeleteTask(new PrismaDeleteRepository());

    const { createTrash } = await create.execute(id);
    const { deleteTrash } = await deleteTask.execute(id);

    return {
      create: res.json(TrashViewModel.toHTTP(createTrash)),
      delete: res.json(deleteTrash),
    };
  }

  async deletedAllTasks(
    req: Request,
    res: {
      json: (arg0: Trash | void) => Promise<Trash[]>;
    }
  ) {
    const create = new CreateAllTrash(new PrismaTrashRepository());
    const deleteAllTasks = new DeleteAllTasks(new PrismaDeleteRepository());

    const { createTrash } = await create.execute();
    const { deleteTrash } = await deleteAllTasks.execute();

    return {
      create: res.json(createTrash),
      delete: res.json(deleteTrash),
    };
  }
}
