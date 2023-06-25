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

const manyRequest = new RateLimiter(10).getMiddleware()
const fewRequest = new RateLimiter(2).getMiddleware()

@Controller("trash")
@ClassMiddleware(AuthMiddleware)
export class TrashTasks extends BaseController {

  @Get("all")
  @Middleware(fewRequest)
  async findAllTrashTasks(
    req: Request,
    res: {
      json: (arg0: TrashViewModel) => Promise<Trash[]>;
    }
  ) {
    const allTrash = new AllTrash(new PrismaTrashRepository());
    const userId = req.context.userId._id
    try{
      const { trash } = await allTrash.execute(userId);
      return { get: res.json(trash.map(TrashViewModel.toHTTP)) };
    } catch (err) {
      return logger.error(err);
    }
  }

  @Delete(":id/delete")
  @Middleware(manyRequest)
  async deletedTrashTask(
    req: { params: { id: string } },
    res: Response
  ) {
    const id: string = req.params.id;
    const deleted = new DeleteTrash(new PrismaDeleteTrashRepository());
   
    try{
      const { deleteTrash } = await deleted.execute(id);
      return { delete: res.json(deleteTrash) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  }

  @Delete("delete/all")
  @Middleware(manyRequest)
  async deletedAllTrashTasks(
    _: Request,
    res: Response
  ) {
    const deleteAllTrash = new DeleteAllTrash(
      new PrismaDeleteTrashRepository()
    );
   
    try{
      const { deleteTrash } = await deleteAllTrash.execute();
      return { delete: res.json(deleteTrash) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  }
}
