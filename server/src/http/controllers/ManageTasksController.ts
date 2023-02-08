import { PrismaClient } from "@prisma/client";
import { Task } from "../../entities/Task";
import { CreateTaskBody } from "../dtos/create-task-body";
import { CreateTask } from "../../use-cases/functions/manage-cases/Post-create";

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
  async createTask(
    req: {
      body: {
        id: string;
        title: string;
        description: string;
        limitDay: number;
        limitMonth: number;
        limitYear: number;
        done: boolean;
      };
    },
    res: { json: (arg0: void) => Task }
  ): Promise<Task> {
    const create = new CreateTask();

    return res.json(
      await create.createTask(
        {
          title: req.body.title,
          description: req.body.description,
          limitDay: req.body.limitDay,
          limitMonth: req.body.limitMonth,
          limitYear: req.body.limitYear,
          done: req.body.done,
        },
        req.body.id
      )
    );
  }

  changeCondition = async (
    req: { params: { id: string; condition: string } },
    res: { json: (arg0: ITask) => Response }
  ) => {
    const id: string = req.params.id;
    const condition: boolean =
      Number(req.params.condition) === 1 ? true : false;
    const tasks: ITask = await prisma.task.update({
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
      body: ITask;
      params: { id: string };
    },
    res: { json: (arg0: ITask) => Response }
  ) => {
    const id: string = req.params.id;
    const JunctionOfDateFragments = `${req.body.limitMonth}/${req.body.limitDay}/${req.body.limitYear}`;
    const tasks: ITask = await prisma.task.update({
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
  };
}
