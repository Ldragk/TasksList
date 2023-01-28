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
  const ManageTasksController: any = new ManageTasks();
  app.post("/tasks/create", ManageTasksController.createTask);
  app.patch("/tasks/change/:id/:condition", ManageTasksController.changeCondition);
  app.put("/tasks/fullChange/:id/", ManageTasksController.updateTasks);

  const ConsultTaskController: any = new ConsultTask();
  app.get("/tasks/all", ConsultTaskController.consultAllTasks);
  app.get("/tasks/:month/monthTasks", ConsultTaskController.consultTasksMonth);
  app.get("/tasks/:day/dayTasks", ConsultTaskController.consultTasksDay);
  app.get("/tasks/done/:condition", ConsultTaskController.contultDoneTasks);
  app.get("/tasks/delayed", ConsultTaskController.consultDelayedTasks);

  const DeleteTaskController: any = new DeleteTask();
  app.delete("/tasks/delete/all", DeleteTaskController.deletedAllTasks);
  app.delete("/tasks/delete/:id", DeleteTaskController.deletedTask);

  const TrashTasksController: any = new TrashTasks();
  app.post("/tasks/trash/save/:id", TrashTasksController.createTrashTask);
  app.get("tasks/trash/all", TrashTasksController.consultAllTrashTasks);

  const TrashDeleteController: any = new TrashDelete();
  app.delete("/tasks/delete/trash/:id", TrashDeleteController.deletedTrashTask);
  app.delete("/tasks/delete/trash/all",TrashDeleteController.deletedAllTrashTasks);

  const Server: number = 3333;
  app.listen(Server, () => console.log(`Server is running on port ${Server}`));
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
