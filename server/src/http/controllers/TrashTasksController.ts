import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TrashTasks {

  createTrashTask = async (
    req: { params: { id: string } },
    res: { json: (arg0: ITask) => void }
  ) => {
    const idDeleted = req.params.id;
    const tasks = await prisma.task.findUnique({
      where: {
        id: idDeleted,
      },
    });
    const saveDeletedTasks: ITask = await prisma.deletedTask.create({
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
