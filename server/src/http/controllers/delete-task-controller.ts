import { ClassMiddleware, Controller, Delete, Middleware } from "@overnightjs/core";
import { PrismaDeleteRepository } from "@src/prisma/repositories/tasks/prisma-delete-repository";
import { PrismaManageRepository } from "@src/prisma/repositories/tasks/prisma-manage-repository";
import { PrismaTaskQueryRepository } from "@src/prisma/repositories/tasks/prisma-query-repository";
import { PrismaTrashRepository } from "@src/prisma/repositories/trash/prisma-trash-repository";
import { DeleteAllTasks } from "@src/use-cases/delete-cases/delete-all-tasks";
import { DeleteTask } from "@src/use-cases/delete-cases/delete-task";
import { CreateAllTrash } from "@src/use-cases/trash-cases/create-all-trash";
import { CreateTrash } from "@src/use-cases/trash-cases/create-trash";
import { TrashViewModel } from "../view-models/trash-view-model";
import { Request, Response } from "express";
import { BaseController } from ".";
import { RateLimiter } from "@src/middlewares/rate-limiter";
import { AuthMiddleware } from "@src/middlewares/auth";
import { Task } from "@src/entities/task";

const manyRequest = 30
const fewRequest = 3

@Controller("tasks")
@ClassMiddleware(AuthMiddleware)
export class DeleteTasks extends BaseController {

  @Delete("delete/unique/:id")
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  async deleteTask(
    req: Request<{ id: string }>,
    res: Response
  ) {
    const id: string = req.params.id;
    const userId = req.context.userId._id

    const create = new CreateTrash(
      new PrismaTrashRepository(),
      new PrismaManageRepository()
    );
    const deleteTask = new DeleteTask(new PrismaDeleteRepository());

    try {
      const { createTrash } = await create.execute(userId, id);
      const { deleteTrash } = await deleteTask.execute(userId, id);

      const cachedTasksWithoutTheDeleted = this.cache.find<Task>(this.taskCacheKey, id);
      this.cache.set<Task[] | Task>(this.taskCacheKey, cachedTasksWithoutTheDeleted as Task[] | Task);

      return {
        create: res.status(201).json(TrashViewModel.toHTTP(createTrash)),
        delete: res.status(200).json(deleteTrash),
      };
    } catch (err) {
      return this.errorResponse(res, err as Error)
    }
  }

  @Delete("delete/all")
  @Middleware(new RateLimiter(fewRequest).getMiddleware())
  async deletedAllTasks(
    req: Request,
    res: Response
  ) {
    const create = new CreateAllTrash(
      new PrismaTrashRepository(),
      new PrismaTaskQueryRepository()
    );
    const deleteAllTasks = new DeleteAllTasks(new PrismaDeleteRepository());
    const userId = req.context.userId._id

    try {
      const { createTrash } = await create.execute(userId);
      const { deleteTrash } = await deleteAllTasks.execute(userId);


      const t = []
      t.push(createTrash)      
      const createTrashResults = await Promise.all(t);      
      const allCreateTrashResolved = createTrashResults.every(result => result);

      if (allCreateTrashResolved) {
        this.cache.set(this.taskCacheKey, []);
      }

      return {
        create: res.status(201).json(createTrash),
        delete: res.status(200).json(deleteTrash)
      }
    } catch (err) {
      return this.errorResponse(res, err as Error)
    }
  }
}
