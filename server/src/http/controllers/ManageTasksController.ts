import { PrismaClient } from "@prisma/client";
import { Task } from "../../entities/Task";
import { PrismaTaskMapper } from "../../prisma/repositories/tasks/Prisma-task-mapper";
import { TaskCondition } from "../../use-cases/functions/manage-cases/Patch-chance-condition";
import { CreateTask } from "../../use-cases/functions/manage-cases/Post-create";
import { TaskBody } from "../dtos/create-task-body";

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
      body: Task;
      id: string;
    },
    res: { json: (arg0: TaskBody) => Task }
  ): Promise<Task> {
    const taskToBeCreate = await CreateTask.execute(
      {
        title: req.body.title,
        description: req.body.description,
        limitDay: req.body.limitDay,
        limitMonth: req.body.limitMonth,
        limitYear: req.body.limitYear,
        done: req.body.done,
      },
      req.id
    );

    return res.json(taskToBeCreate);
  }

  updateCondition = async (
    req: { params: { id: string } },
    res: { json: (arg0: TaskBody) => Promise<TaskBody> }
  ) => {
    const taskUpdate = await TaskCondition.execute(req.params.id);

    return res.json(taskUpdate);
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
