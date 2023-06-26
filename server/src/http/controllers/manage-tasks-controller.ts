import { PrismaManageRepository } from "@src/prisma/repositories/tasks/prisma-manage-repository";
import { TaskStatus } from "@src/use-cases/manage-cases/chance-condition";
import { CreateTask } from "@src/use-cases/manage-cases/create";
import { FullUpdate } from "@src/use-cases/manage-cases/update";
import { TaskBody } from "../dtos/create-task-body";
import { TaskViewModel } from "../view-models/task-view-model";
import { ClassMiddleware, Controller, Middleware, Patch, Post, Put } from '@overnightjs/core';
import { BaseController } from ".";
import { RateLimiter } from "@src/middlewares/rate-limiter";
import { AuthMiddleware } from "@src/middlewares/auth";
import { Request, Response } from 'express';

const manyRequest = 30
const fewRequest = 15

@Controller('tasks')
@ClassMiddleware(AuthMiddleware)
export class ManageTasks extends BaseController {

  @Post('create')
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  async create(
    req: Request,
    res: Response
  ) {
    const createTask = new CreateTask(new PrismaManageRepository());
    const userId = req.context.userId._id   
    
    try {
      const { task } = await createTask.execute({
        ...req.body,
        ...{ userId: userId },
      });

      return { task: res.status(201).json(TaskViewModel.toHTTP(task)) };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  }

  @Patch('change/:id')
  @Middleware(new RateLimiter(fewRequest).getMiddleware())
  async updateCondition(
    req: Request<{
      id: string;
    }>,
    res: Response
  ) {
    const id: string = req.params.id;
    const taskStatus = new TaskStatus(new PrismaManageRepository());
    const userId = req.context.userId._id
    try {
      const { task } = await taskStatus.execute(id, userId);

      return { task: res.status(200).json(TaskViewModel.toHTTP(task)) };
    } catch (err) {
      return this.errorResponse(res, err as Error)
    }
  }

  @Put('fullChange/:id')
  @Middleware(new RateLimiter(fewRequest).getMiddleware())
  async updateTasks(
    req: Request<{
      id: string;
      body: TaskBody;
    }>,
    res: Response
  ) {
    const id: string = req.params.id;
    const userId = req.context.userId._id
    const { title, content, date, done } = req.body;
    const fullUpdate = new FullUpdate(new PrismaManageRepository());

    try {
      const { task } = await fullUpdate.execute(id, userId, {
        title,
        content,
        date,
        done,
      });
      return { task: res.status(200).json(TaskViewModel.toHTTP(task)) };
    } catch (err) {
      return this.errorResponse(res, err as Error)
    }
  }
}
