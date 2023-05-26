import { OverdueTasks } from "@src/use-cases/query-cases/get-overdue";
import { QueryAllTasks } from "@src/use-cases/query-cases/get-all";
import { QueryByFullDate } from "@src/use-cases/query-cases/get-full-date";
import { QueryByMonth } from "@src/use-cases/query-cases/get-month";
import { QueryByYear } from "@src/use-cases/query-cases/get-year";
import { TasksCondition } from "@src/use-cases/query-cases/get-status";
import { Task } from "@src/entities/task";
import { TaskViewModel } from "../view-models/task-view-model";
import { PrismaTaskQueryRepository } from "@src/prisma/repositories/tasks/Prisma-query-repository";
import { Controller, Get } from "@overnightjs/core";


@Controller("tasks")
export class QueryTask {

  @Get("all")
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

  @Get("date/:day/:month/:year")
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

  @Get("month/:month/:year")
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

  @Get("year/:year")
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

  @Get("done/:condition")
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

  @Get("delayed")
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
