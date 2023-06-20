import { OverdueTasks } from "@src/use-cases/query-cases/get-overdue";
import { QueryAllTasks } from "@src/use-cases/query-cases/get-all";
import { QueryByFullDate } from "@src/use-cases/query-cases/get-full-date";
import { QueryByMonth } from "@src/use-cases/query-cases/get-month";
import { QueryByYear } from "@src/use-cases/query-cases/get-year";
import { TasksCondition } from "@src/use-cases/query-cases/get-status";
import { TaskViewModel } from "../view-models/task-view-model";
import { PrismaTaskQueryRepository } from "@src/prisma/repositories/tasks/prisma-query-repository";
import { ClassMiddleware, Controller, Get, Middleware } from "@overnightjs/core";
import { Request, Response } from "express";
import logger from "@src/logger";
import { BaseController } from ".";
import { RateLimiter } from "@src/middlewares/rate-limiter";
import { AuthMiddleware } from "@src/middlewares/auth";

const manyRequest = new RateLimiter(10).getMiddleware()
const fewRequest = new RateLimiter(2).getMiddleware()

@Controller("tasks")
@ClassMiddleware(AuthMiddleware)
export class QueryTask extends BaseController {

  @Get("all")
  @Middleware(fewRequest)
  getAllTasks = async (
    _: Request,
    res: Response
  ) => {
    const queryAllTasks = new QueryAllTasks(new PrismaTaskQueryRepository());

    try {
      const { tasks } = await queryAllTasks.execute();
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return logger.error(err);
    }
  };

  @Get("date/:month/:day/:year")
  @Middleware(manyRequest)
  getByFullDate = async (
    req: { params: { day: string; month: string; year: string } },
    res: Response
  ) => {
    const tasksByFullDate = new QueryByFullDate(
      new PrismaTaskQueryRepository()
    );

    const { month, day, year } = req.params;

    const formattedDate = `${this.removeLeadingZeros(month)}/${this.removeLeadingZeros(day)}/${year}`;

    try {
      const { tasks } = await tasksByFullDate.execute({
        date: formattedDate,
      });
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return logger.error(err);
    }
  };

  @Get("month/:month/:year")
  @Middleware(manyRequest)
  getByMonth = async (
    req: { params: { month: string; year: string } },
    res: Response
  ) => {
    const tasksByMonth = new QueryByMonth(new PrismaTaskQueryRepository());
    const { month, year } = req.params;

    const formatMonth = this.removeLeadingZeros(month);
    const formatYear = this.removeLeadingZeros(year);

    try {
      const { tasks } = await tasksByMonth.execute({
        month: Number(formatMonth),
        year: Number(formatYear),
      });
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  };

  @Get("year/:year")
  @Middleware(manyRequest)
  getByYear = async (
    req: { params: { year: string } },
    res: Response
  ) => {
    const tasksByYear = new QueryByYear(new PrismaTaskQueryRepository());   

    try {
      const { tasks } = await tasksByYear.execute({
        year: Number(req.params.year),
      });
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  };

  @Get("done/:condition")
  @Middleware(fewRequest)
  getDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: Response
  ) => {
    const tasksCondition = new TasksCondition(new PrismaTaskQueryRepository());

    try {
      const { tasks } = await tasksCondition.execute(
        Number(req.params.condition)
      );
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  };

  @Get("delayed")
  @Middleware(fewRequest)
  getOverdueTasks = async (
    _: Request,
    res: Response
  ) => {
    const overdueTasks: OverdueTasks = new OverdueTasks(
      new PrismaTaskQueryRepository()
    );

    try {
      const { tasks } = await overdueTasks.execute();
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  };

  removeLeadingZeros(value: string): string {
    return value.replace(/^0+/, '');
  }
}
