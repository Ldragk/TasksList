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
import { Request, Response } from "express";
import logger from "@src/logger";
import { BaseController } from ".";


@Controller("tasks")
export class DeleteTasks extends BaseController {

  @Delete("delete/unique/:id")
  async deleteTask(
    req: { params: { id: string } },
    res: Response
  ) {
    const id: string = req.params.id;

    const create = new CreateTrash(
      new PrismaTrashRepository(),
      new PrismaManageRepository()
    );
    const deleteTask = new DeleteTask(new PrismaDeleteRepository());

    try {
      const { createTrash } = await create.execute(id);
      const { deleteTrash } = await deleteTask.execute(id);      

      return {
        create: res.status(201).json(TrashViewModel.toHTTP(createTrash)),
        delete: res.status(200).json(deleteTrash),
      };
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error)
    }
  }

  @Delete("delete/all")
  async deletedAllTasks(
    _: Request,
    res: Response
  ) {
    const create = new CreateAllTrash(
      new PrismaTrashRepository(),
      new PrismaTaskQueryRepository()
    );
    const deleteAllTasks = new DeleteAllTasks(new PrismaDeleteRepository());

    try {
      const { createTrash } = await create.execute();
      const { deleteTrash } = await deleteAllTasks.execute();     

      return {
        create: res.status(201).json(createTrash),
        delete: res.status(200).json(deleteTrash)
      }
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error)
    }
  }
}
