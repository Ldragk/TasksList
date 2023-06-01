import { Controller, Delete } from "@overnightjs/core";
import { Trash } from "@src/entities/trash";
import { PrismaDeleteRepository } from "@src/prisma/repositories/tasks/Prisma-delete-repository";
import { PrismaManageRepository } from "@src/prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "@src/prisma/repositories/tasks/Prisma-query-repository";
import { PrismaTrashRepository } from "@src/prisma/repositories/trash/Prisma-trash-repository";
import { DeleteAllTasks } from "@src/use-cases/delete-cases/delete-all-tasks";
import { DeleteTask } from "@src/use-cases/delete-cases/delete-task";
import { CreateAllTrash } from "@src/use-cases/trash-cases/create-all-trash";
import { CreateTrash } from "@src/use-cases/trash-cases/create-trash";
import { TrashViewModel } from "../view-models/trash-view-model";
import { Request } from "express";
import logger from "@src/logger";


@Controller("tasks")
export class DeleteTasks {

  @Delete("delete/unique/:id")
  async deleteTask(
    req: { params: { id: string } },
    res: { json: (arg0: TrashViewModel | void) => Promise<Trash> }
  ) {
    const id: string = req.params.id;

    const create = new CreateTrash(
      new PrismaTrashRepository(),
      new PrismaManageRepository()
    );
    const deleteTask = new DeleteTask(new PrismaDeleteRepository());

    try{
      const { createTrash } = await create.execute(id);
    const { deleteTrash } = await deleteTask.execute(id);
      
    return {
      create: res.json(TrashViewModel.toHTTP(createTrash)),
      delete: res.json(deleteTrash),
    };
    } catch (err) {
      return logger.error(err);
    }
  }

  @Delete("delete/all")
  async deletedAllTasks(
    _: Request,
    res: {
      json: (arg0: Trash | void) => Promise<Trash[]>;
    }
  ) {
    const create = new CreateAllTrash(
      new PrismaTrashRepository(),
      new PrismaTaskQueryRepository()
    );
    const deleteAllTasks = new DeleteAllTasks(new PrismaDeleteRepository());

    try{
      const { createTrash } = await create.execute();
    const { deleteTrash } = await deleteAllTasks.execute();

    return {
      create: res.json(createTrash),
      delete: res.json(deleteTrash),
    };
    } catch (err) {
      return logger.error(err);
    }
  }
}
