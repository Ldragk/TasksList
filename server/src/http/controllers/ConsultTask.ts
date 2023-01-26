import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ConsultTask {
  consultAllTasks = async (
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
    const tasks = await prisma.tasks.findMany({
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

  consultTasksMonth = async (
    req: { params: { month: number } },
    res: {
      json: (
        arg0: {
          title: string;
          description: string;
          date: string;
          done: boolean;
          createdAt: string;
          updatedAt: string;
        }[]
      ) => Response;
    }
  ) => {
    const month = Number(req.params.month);

    const monthTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,
        date: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        limitMonth: month,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(
      monthTasks.map((tasks) => {
        return {
          ...tasks,
          title: tasks.title,
          description: tasks.description,
          date: tasks.date,
          done: tasks.done,
          createdAt: tasks.createdAt.toISOString(),
          updatedAt: tasks.updatedAt.toISOString(),
        };
      })
    );
  };

  consultTasksDay = async (
    req: { params: { day: number } },
    res: {
      json: (
        arg0: {
          title: string;
          description: string;
          date: string;
          done: boolean;
          createdAt: string;
          updatedAt: string;
        }[]
      ) => Response;
    }
  ) => {
    const day = Number(req.params.day);

    const dayTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,
        date: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        limitDay: day,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(
      dayTasks.map((tasks) => {
        return {
          ...tasks,
          title: tasks.title,
          description: tasks.description,
          date: tasks.date,
          done: tasks.done,
          createdAt: tasks.createdAt.toISOString(),
          updatedAt: tasks.updatedAt.toISOString(),
        };
      })
    );
  };
}
