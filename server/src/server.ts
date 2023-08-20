import './util/module-alias';
import { Server } from "@overnightjs/core";
import cors from "cors";
import express, { Application } from "express";
import * as http from 'http';
import { DeleteTasks } from "./http/controllers/delete-task-controller";
import { QueryTask } from "./http/controllers/get-task-controller";
import { ManageTasks } from "./http/controllers/manage-tasks-controller";
import { Notifications } from "./http/controllers/notifications-controller";
import { TrashTasks } from "./http/controllers/trash-controller";
import expressPino from 'express-pino-logger';
import logger from "./logger";
import { prisma } from "./prisma/prisma-client";
import { UserController } from './http/controllers/user-controller';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { apiErrorValidator } from './middlewares/api-error-validator';
import docs from './swagger';

export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private port = 3333) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress()
    await this.docsSetup();
    await this.databaseSetup();
    this.setupErrorHandles()
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.setupControllers();
    this.app.use(expressPino({ logger }));
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private setupErrorHandles(): void {
    this.app.use(apiErrorValidator);
  }

  private setupControllers(): void {
    const manageTasksController = new ManageTasks();
    const queryTaskController = new QueryTask();
    const notificationsController = new Notifications();
    const deleteTaskController = new DeleteTasks();
    const trashController = new TrashTasks();
    const userController = new UserController();
    this.addControllers([
      manageTasksController,
      queryTaskController,
      notificationsController,
      deleteTaskController,
      trashController,
      userController
    ]);
  }

  private async databaseSetup(): Promise<void> {
    await prisma.$connect();
  }

  public async close(): Promise<void> {
    await prisma.$disconnect();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
    this.app.use(OpenApiValidator.middleware({
      apiSpec: JSON.stringify(docs),
      validateRequests: true,
      validateResponses: true,
      unknownFormats: ['jwt', 'objectId'],
      validateFormats: false
    }));
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }
}

