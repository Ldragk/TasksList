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
    const JunctionOfDateFragments =
      req.body.limitDay + "/" + req.body.limitMonth + "/" + req.body.limitYear;
    const tasks: ITask = await prisma.tasks.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        limitDay: Number(req.body.limitDay),
        limitMonth: Number(req.body.limitMonth),
        limitYear: Number(req.body.limitYear),
        date: JunctionOfDateFragments,
      },
    });
    return res.json(tasks);
  };

  changeCondition = async (
    req: { params: { id: string, condition: string } },
    res: { json: (arg0: ITask) => Response }
  ) => {
    const id: string = req.params.id;
    const condition: boolean = Number(req.params.condition) === 1 ? true : false;    
    const tasks: ITask = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        done: condition,
      },
    });
    return res.json(tasks);
  };

  updateTasks = async (
    req: {
      body: ITask; params: { id: string } 
},
    res: { json: (arg0: ITask) => Response }
  ) => {
    const id: string = req.params.id;
    const JunctionOfDateFragments =
      req.body.limitDay + "/" + req.body.limitMonth + "/" + req.body.limitYear;
    const tasks: ITask = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        limitDay: Number(req.body.limitDay),
        limitMonth: Number(req.body.limitMonth),
        limitYear: Number(req.body.limitYear),
        date: JunctionOfDateFragments,
      },
    });
    return res.json(tasks);
  }
}
