import { Controller, Delete, Get } from "@overnightjs/core";
import { Trash } from "@src/entities/trash";
import { PrismaDeleteTrashRepository } from "@src/prisma/repositories/trash/Prisma-delete-trash-repository";
import { PrismaTrashRepository } from "@src/prisma/repositories/trash/Prisma-trash-repository";
import { DeleteAllTrash } from "@src/use-cases/delete-cases/delete-all-trash";
import { DeleteTrash } from "@src/use-cases/delete-cases/delete-trash";
import { AllTrash } from "@src/use-cases/trash-cases/get-all-trash";
import { TrashViewModel } from "../view-models/trash-view-model";
import { Request, Response } from "express";
import logger from "@src/logger";
import { BaseController } from ".";

@Controller("trash")
export class TrashTasks extends BaseController {

  @Get("all")
  async findAllTrashTasks(
    _: Request,
    res: {
      json: (arg0: TrashViewModel) => Promise<Trash[]>;
    }
  ) {
    const allTrash = new AllTrash(new PrismaTrashRepository());
    
    try{
      const { trash } = await allTrash.execute();
      return { get: res.json(trash.map(TrashViewModel.toHTTP)) };
    } catch (err) {
      return logger.error(err);
    }
  }

  @Delete(":id/delete")
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
      return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  }

  @Delete("delete/all")
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
      return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  }
}
