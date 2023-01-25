import { Prisma, PrismaClient } from "@prisma/client";
import { ITask } from "./server";
const prisma = new PrismaClient();

export const getAllDetetedTasks = async (
  req: any,
  res: { json: (arg0: any) => any }
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

export const postDeletedTask = async (
  req: { params: { deleted: any } },
  res: { json: (arg0: ITask) => void },
  next: any
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
  res.json(saveDeletedTasks);
};

export const deletedTask = async (
  req: { params: { trashDelete: any } },
  res: { json: (arg0: any) => void }
) => {
  const idDeleted = req.params.trashDelete;
  const deleteTask = await prisma.tasks.delete({
    where: {
      id: idDeleted,
    },
  });
  res.json(deleteTask);
};

export const deletedTrashTask = async (
    req: { params: { trashDelete: any } },
    res: { json: (arg0: any) => void }
  ) => {
    const idDeleted = req.params.trashDelete;
    const deleteTask = await prisma.deletedTasks.delete({
      where: {
        id: idDeleted,
      },
    });
    res.json(deleteTask);
  };
  


export const deletedAllTasks = async (
  req: any,
  res: { json: (arg0: Prisma.BatchPayload) => any }
) => {
  const deleted = await prisma.tasks.deleteMany();
  return res.json(deleted);
};

export const DeletedAllTrashTasks = async (
  req: any,
  res: { json: (arg0: Prisma.BatchPayload) => any }
) => {
  const deleted = await prisma.deletedTasks.deleteMany();
  return res.json(deleted);
};
