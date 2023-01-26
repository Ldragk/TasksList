import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ITask {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  date: string;
}

export class ManageTasks {
  createTask = async (
    req: {
      body: {
        limitDay: string;
        limitMonth: string;
        limitYear: string;
        title: string;
        description: string;
      };
    },
    res: { json: (arg0: ITask) => any }
  ) => {
    const JunctionofDateFragments =
      req.body.limitDay + "/" + req.body.limitMonth + "/" + req.body.limitYear;
    const tasks: ITask = await prisma.tasks.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        limitDay: Number(req.body.limitDay),
        limitMonth: Number(req.body.limitMonth),
        limitYear: Number(req.body.limitYear),
        date: JunctionofDateFragments,
      },
    });
    return res.json(tasks);
  };
}
