import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteTask {
  deletedTask = async (
    req: { params: { id: string } },
    res: {
      json: (arg0: {
        id: string;
        title: string;
        description: string;
        date: string;
        done: boolean;
        createdAt: Date;
        updatedAt: Date;
      }) => Response;
    }
  ) => {
    const idDeleted: string = req.params.id;
    const deleteTask = await prisma.tasks.delete({
      where: {
        id: idDeleted,
      },
    });
    return res.json(deleteTask);
  };

  deletedAllTasks = async (
    req: Request,
    res: { json: (arg0: Prisma.BatchPayload) => JSON }
  ) => {
    const deleted: Prisma.BatchPayload = await prisma.tasks.deleteMany();
    return res.json(deleted);
  };
}
