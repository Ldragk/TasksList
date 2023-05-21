import { OverdueTasks } from "../../use-cases/query-cases/get-overdue";
import { QueryAllTasks } from "../../use-cases/query-cases/get-all";
import { QueryByFullDate } from "../../use-cases/query-cases/get-full-date";
import { QueryByMonth } from "../../use-cases/query-cases/get-month";
import { QueryByYear } from "../../use-cases/query-cases/get-year";
import { TasksCondition } from "../../use-cases/query-cases/get-status";
import { Task } from "../../entities/task";
import { TaskViewModel } from "../view-models/task-view-model";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class QueryTask {
  getAllTasks = async (
    _: Request,
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const queryAllTasks = new QueryAllTasks(new PrismaTaskQueryRepository());
    const { tasks } = await queryAllTasks.execute();
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getByFullDate = async (
    req: { params: { day: string; month: string; year: string } },
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const tasksByFullDate = new QueryByFullDate(
      new PrismaTaskQueryRepository()
    );

    const { tasks } = await tasksByFullDate.execute({
      date: `${req.params.month}/${req.params.day}/${req.params.year}`,
    });
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getByMonth = async (
    req: { params: { month: string; year: string } },
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const tasksByMonth = new QueryByMonth(new PrismaTaskQueryRepository());
    const { tasks } = await tasksByMonth.execute({
      month: Number(req.params.month),
      year: Number(req.params.year),
    });
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getByYear = async (
    req: { params: { year: string } },
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const tasksByYear = new QueryByYear(new PrismaTaskQueryRepository());
    const { tasks } = await tasksByYear.execute({
      year: Number(req.params.year),
    });
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const tasksCondition = new TasksCondition(new PrismaTaskQueryRepository());
    const { tasks } = await tasksCondition.execute(
      Number(req.params.condition)
    );
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getOverdueTasks = async (
    _: Request,
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const overdueTasks: OverdueTasks = new OverdueTasks(
      new PrismaTaskQueryRepository()
    );
    const { tasks } = await overdueTasks.execute();
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };
}
