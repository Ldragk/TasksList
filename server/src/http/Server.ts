import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { DeleteTask } from "./controllers/DeleteTask";
import { TrashDelete } from "./controllers/TrashDelete";
import { TrashTasks } from "./controllers/TrashTasks";
import { ManageTasks } from "./controllers/ManageTasks";
import { ConsultTask } from "./controllers/ConsultTask";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

async function main() {
  const ManageTasksController = new ManageTasks();
  app.post("/tasks/create", ManageTasksController.createTask);

  const ConsultTaskController: any = new ConsultTask();
  app.get("/tasks/all", ConsultTaskController.consultAllTasks);
  app.get("/tasks/:month/monthTasks", ConsultTaskController.consultTasksMonth);
  app.get("/tasks/:day/dayTasks", ConsultTaskController.consultTasksDay);

  const DeleteTaskControllers: any = new DeleteTask();
  app.delete("/deleteAllTasks", DeleteTaskControllers.deletedAllTasks);
  app.delete("/trashDelete/:id", DeleteTaskControllers.deletedTask);

  const TrashTasksControllers: any = new TrashTasks();
  app.get("/getdeletedTasks/all", TrashTasksControllers.getAllDetetedTasks);
  app.post("/tasks/:id", TrashTasksControllers.postDeletedTask);

  const TrashDeleteControllers: any = new TrashDelete();
  app.delete("tasks/trashDelete/:id", TrashDeleteControllers.deletedTrashTask);
  app.delete("tasks/deleteAllTrash", TrashDeleteControllers.deletedAllTrashTasks);

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  const server: number = 3333;
  app.listen(server, () => console.log(`Server is running on port ${server}`));
}
