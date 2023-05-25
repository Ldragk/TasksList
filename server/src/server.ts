import { Server } from "@overnightjs/core";
import cors from "cors";
import express from "express";
import * as http from 'http';
import { DeleteTasks } from "./http/controllers/delete-task-controller";
import { QueryTask } from "./http/controllers/get-task-controller";
import { ManageTasks } from "./http/controllers/manage-tasks-controller";
import { Notifications } from "./http/controllers/notifications-controller";
import { TrashTasks } from "./http/controllers/trash-controller";
import expressPino from 'express-pino-logger';
import logger from "./logger";
import { prisma } from "./prisma/prisma-client";


export class SetupServer extends Server {
    private server?: http.Server;    
  
    constructor(private port = 3333) {
      super();
    }

    public async init(): Promise<void> {
      this.setupExpress
      await this.databaseSetup();
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

      private setupControllers(): void {
        const manageTasksController = new ManageTasks();
        const queryTaskController = new QueryTask();
        const notificationsController = new Notifications();
        const deleteTaskController = new DeleteTasks();
        const trashController = new TrashTasks();
        this.addControllers([
            manageTasksController,
            queryTaskController,
            notificationsController,
            deleteTaskController,
            trashController,
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

      public start(): void {
        this.app.listen(this.port, () => {
          logger.info('Server listening on port: ' + this.port);
        });
      }
}