import { ClassMiddleware, Controller, Delete, Get, Middleware } from "@overnightjs/core";
import { Trash } from "@src/entities/trash";
import { PrismaDeleteTrashRepository } from "@src/prisma/repositories/trash/prisma-delete-trash-repository";
import { PrismaTrashRepository } from "@src/prisma/repositories/trash/prisma-trash-repository";
import { DeleteAllTrash } from "@src/use-cases/delete-cases/delete-all-trash";
import { DeleteTrash } from "@src/use-cases/delete-cases/delete-trash";
import { AllTrash } from "@src/use-cases/trash-cases/get-all-trash";
import { TrashViewModel } from "../view-models/trash-view-model";
import { Request, Response } from "express";
import logger from "@src/logger";
import { BaseController } from ".";
import { RateLimiter } from "@src/middlewares/rate-limiter";
import { AuthMiddleware } from "@src/middlewares/auth";
import NodeCache from 'node-cache';

const manyRequest = 10
const fewRequest = 2

@Controller("trash")
@ClassMiddleware(AuthMiddleware)
export class TrashTasks extends BaseController {
  private cache = new NodeCache();

  @Get("all")
  @Middleware(new RateLimiter(fewRequest + 2).getMiddleware())
  async findAllTrashTasks(
    req: Request,
    res: Response
  ) {
    const cacheKey = 'allTasks';
    const cachedTrash = this.cache.get(cacheKey);

    if (cachedTrash) {
      return res.status(200).json(cachedTrash);
    }

    const allTrash = new AllTrash(new PrismaTrashRepository());
    const userId = req.context.userId._id
    try {
      const { trash } = await allTrash.execute(userId);
      const tasksData = trash.map(TrashViewModel.toHTTP);

      this.cache.set(cacheKey, tasksData);

      return { get: res.json(trash.map(TrashViewModel.toHTTP)) };
    } catch (err) {
      return logger.error(err);
    }
  }

  @Delete(":id/delete")
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  async deletedTrashTask(
    req: { params: { id: string } },
    res: Response
  ) {
    const id: string = req.params.id;
    const deleted = new DeleteTrash(new PrismaDeleteTrashRepository());

    try {
      const { deleteTrash } = await deleted.execute(id);
      return { delete: res.json(deleteTrash) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  }

  @Delete("delete/all")
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  async deletedAllTrashTasks(
    _: Request,
    res: Response
  ) {
    const deleteAllTrash = new DeleteAllTrash(
      new PrismaDeleteTrashRepository()
    );

    try {
      const { deleteTrash } = await deleteAllTrash.execute();
      return { delete: res.json(deleteTrash) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  }
}
