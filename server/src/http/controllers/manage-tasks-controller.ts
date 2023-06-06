import { Task } from "@src/entities/task";
import { PrismaManageRepository } from "@src/prisma/repositories/tasks/Prisma-manage-repository";
import { TaskStatus } from "@src/use-cases/manage-cases/chance-condition";
import { CreateTask } from "@src/use-cases/manage-cases/create";
import { FullUpdate } from "@src/use-cases/manage-cases/update";
import { TaskBody } from "../dtos/create-task-body";
import { TaskViewModel } from "../view-models/task-view-model";
import { Controller, Patch, Post, Put } from '@overnightjs/core';
import logger from "@src/logger";
import { BaseController } from ".";
import { Response } from "express";
import { Prisma } from "@prisma/client";

@Controller('tasks')
export class ManageTasks extends BaseController {

  @Post('create')
  async create(
    req: { body: TaskBody },
    res: Response
  ) {
    const { title, content, date, done } = req.body;
    const createTask = new CreateTask(new PrismaManageRepository());
    try {
      const { task } = await createTask.execute({
        title,
        content,
        date,
        done,
      });

      return { task: res.status(201).json(TaskViewModel.toHTTP(task)) };
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  }

  @Patch('change/:id')
  async updateCondition(
    req: { params: { id: string } },
    res: Response
  ) {
    const id: string = req.params.id;
    const taskStatus = new TaskStatus(new PrismaManageRepository());
    try {
      const { task } = await taskStatus.execute(id);

      return { task: res.status(200).json(TaskViewModel.toHTTP(task)) };
    } catch (err) {      
      return this.sendCreateUpdateErrorResponse(res, err as Error)
    }
  }

  @Put('fullChange/:id')
  async updateTasks(
    req: {
      params: { id: string };
      body: TaskBody;
    },
    res: Response
  ) {
    const id: string = req.params.id;
    const { title, content, date, done } = req.body;
    const fullUpdate = new FullUpdate(new PrismaManageRepository());
    try {
      const { task } = await fullUpdate.execute(id, {
        title,
        content,
        date,
        done,
      });

      return { task: res.status(200).json(TaskViewModel.toHTTP(task)) };
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err as Error)
    }
  }
}
