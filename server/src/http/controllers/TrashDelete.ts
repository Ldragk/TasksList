import { deletedTasks, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TrashDelete {
  deletedTrashTask = async (
    req: { params: { trashDelete: string } },
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
    const idDeleted: string = req.params.trashDelete;
    const deleteTask: deletedTasks = await prisma.deletedTasks.delete({
      where: {
        id: idDeleted,
      },
    });
    return res.json(deleteTask);
  };

  deletedAllTrashTasks = async (
    req: Request,
    res: { json: (arg0: Prisma.BatchPayload) => JSON }
  ) => {
    const deleted: Prisma.BatchPayload = await prisma.deletedTasks.deleteMany();
    return res.json(deleted);
  };
}
