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

const manyRequest = 10
const fewRequest = 2

@Controller("tasks")
@ClassMiddleware(AuthMiddleware)
export class QueryTask extends BaseController {

  @Get("all")
  @Middleware(new RateLimiter(fewRequest + 2).getMiddleware())
  getAllTasks = async (
    req: Request,
    res: Response
  ) => {
    const cachedTasks = this.cache.get(this.taskCacheKey);

    if (cachedTasks) {
      return res.status(200).json(cachedTasks);
    }

    const queryAllTasks = new QueryAllTasks(new PrismaTaskQueryRepository());
    const userId = req.context.userId._id;

    try {
      const { tasks } = await queryAllTasks.execute(userId);
      const tasksData = tasks.map(TaskViewModel.toHTTP);

      this.cache.set(this.taskCacheKey, tasksData);

      return res.status(200).json(tasksData);
    } catch (err) {
      return logger.error(err);
    }
  };

  @Get("date/:month/:day/:year")
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  getByFullDate = async (
    req: Request<
      {
        day: string;
        month: string;
        year: string
      }
    >,
    res: Response
  ) => {
    const tasksByFullDate = new QueryByFullDate(
      new PrismaTaskQueryRepository()
    );

    const { month, day, year } = req.params;
    const userId = req.context.userId._id
    const formattedDate = `${this.removeLeadingZeros(month)}/${this.removeLeadingZeros(day)}/${year}`;

    try {
      const { tasks } = await tasksByFullDate.execute(userId, {
        date: formattedDate,
      });
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return logger.error(err);
    }
  };

  @Get("month/:month/:year")
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  getByMonth = async (
    req: Request<
      {
        month: string;
        year: string
      }>,
    res: Response
  ) => {
    const tasksByMonth = new QueryByMonth(new PrismaTaskQueryRepository());
    const { month, year } = req.params;
    const userId = req.context.userId._id
    const formatMonth = this.removeLeadingZeros(month);
    const formatYear = this.removeLeadingZeros(year);

    try {
      const { tasks } = await tasksByMonth.execute(userId, {
        month: Number(formatMonth),
        year: Number(formatYear),
      });
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  };

  @Get("year/:year")
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  getByYear = async (
    req: Request<{ year: string }>,
    res: Response
  ) => {
    const tasksByYear = new QueryByYear(new PrismaTaskQueryRepository());
    const userId = req.context.userId._id

    try {
      const { tasks } = await tasksByYear.execute(userId, {
        year: Number(req.params.year),
      });
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  };

  @Get("done/:condition")
  @Middleware(new RateLimiter(2).getMiddleware())
  getDoneOrNotTasks = async (
    req: Request<{ condition: string }>,
    res: Response
  ) => {
    const tasksCondition = new TasksCondition(new PrismaTaskQueryRepository());
    const userId = req.context.userId._id

    try {
      const { tasks } = await tasksCondition.execute(userId,
        Number(req.params.condition)
      );
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  };

  @Get("overdue")
  @Middleware(new RateLimiter(fewRequest).getMiddleware())
  getOverdueTasks = async (
    req: Request,
    res: Response
  ) => {
    const overdueTasks: OverdueTasks = new OverdueTasks(
      new PrismaTaskQueryRepository()
    );
    const userId = req.context.userId._id

    try {
      const { tasks } = await overdueTasks.execute(userId);
      return { get: res.status(200).json(tasks.map(TaskViewModel.toHTTP)) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  };

  removeLeadingZeros(value: string): string {
    return value.replace(/^0+/, '');
  }
}
