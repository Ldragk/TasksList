import { OverdueTasks } from "../../use-cases/query-cases/Get-overdue";
import { QueryAllTasks } from "../../use-cases/query-cases/Get-all";
import { QueryByFullDate } from "../../use-cases/query-cases/Get-full-date";
import { QueryByMonth } from "../../use-cases/query-cases/Get-month";
import { QueryByYear } from "../../use-cases/query-cases/Get-year";
import { TasksCondition } from "../../use-cases/query-cases/Get-status";
import { Task } from "../../entities/Task";
import { TaskViewModel } from "../view-models/Task-view-model";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class QueryTask {
  getAllTasks = async (
    req: Request,
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
    const tasksByMonth: QueryByMonth = new QueryByMonth({
      month: Number(req.params.month),
      year: Number(req.params.year),
    });
    const { tasks } = await tasksByMonth.execute();
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getByYear = async (
    req: { params: { year: string } },
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const tasksByYear: QueryByYear = new QueryByYear({
      year: Number(req.params.year),
    });
    const { tasks } = await tasksByYear.execute();
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const { tasks } = await TasksCondition.execute(
      Number(req.params.condition)
    );
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };

  getOverdueTasks = async (
    req: Request,
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const overdueTasks: OverdueTasks = new OverdueTasks();
    const { tasks } = await overdueTasks.execute();
    return { get: res.json(tasks.map(TaskViewModel.toHTTP)) };
  };
}
