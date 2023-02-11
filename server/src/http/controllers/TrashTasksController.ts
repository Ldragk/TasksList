import { PrismaClient } from "@prisma/client";
import { Trash } from "../../entities/Trash";
import { CreateTrash } from "../../use-cases/trash-cases/Create-trash";
import { TrashBody } from "../dtos/create-trash-body";

const prisma = new PrismaClient();

export class TrashTasks {
  createTrashTask = async (
    req: { params: { id: string } },
    res: { json: (arg0: TrashBody | object) => Promise<Trash> }
  ) => {
    const idDeleted = req.params.id;

    return res.json(await CreateTrash.execute(idDeleted));
  };

  consultAllTrashTasks = async (
    req: Request,
    res: {
      json: (
        arg0: {
          id: string;
          title: string;
          description: string;
          done: boolean;
          createdAt: Date;
          updatedAt: Date;
        }[]
      ) => Response;
    }
  ) => {
    const tasks = await prisma.deletedTask.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.json(tasks);
  };
}
