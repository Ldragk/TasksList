import { PrismaClient } from "@prisma/client";
import { ITask } from "../Server";
const prisma = new PrismaClient();


export class TrashTasks {
    getAllDetetedTasks = async (
        req: Request,
        res: {
          json: (
            arg0: {
              id: string;
              title: string;
              description: string;
              date: string;
              done: boolean;
              createdAt: Date;
              updatedAt: Date;
            }[]
          ) => Response;
        }
      ) => {
        const tasks = await prisma.deletedTasks.findMany({
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            done: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        return res.json(tasks);
      };

      postDeletedTask = async (
        req: { params: { deleted: string } },
        res: { json: (arg0: ITask) => void }
      ) => {
        const idDeleted = req.params.deleted;
        const tasks = await prisma.tasks.findUnique({
          where: {
            id: idDeleted,
          },
        });
        const saveDeletedTasks: ITask = await prisma.deletedTasks.create({
          data: {
            id: String(tasks?.id),
            title: String(tasks?.title),
            description: String(tasks?.description),
            limitDay: Number(tasks?.limitDay),
            limitMonth: Number(String(tasks?.limitMonth)),
            limitYear: Number(String(tasks?.limitYear)),
            done: Boolean(tasks?.done),
            date: String(tasks?.date),
          },
        });
        return res.json(saveDeletedTasks);
      };
}