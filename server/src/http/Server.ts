import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { DeleteTask } from "./controllers/DeleteTask";
import { TrashDelete } from "./controllers/TrashDelete";
import { TrashTasks } from "./controllers/TrashTasks";
import { ManageTasks } from "./controllers/ManageTasks";
import { QueryTask } from "./controllers/QueryTask";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

async function main() {
  const ManageTasksController: any = new ManageTasks();
  app.post("/tasks/create", ManageTasksController.createTask);
  app.patch("/tasks/change/:id/:condition", ManageTasksController.changeCondition);
  app.put("/tasks/fullChange/:id/", ManageTasksController.updateTasks);

  const QueryTaskController: any = new QueryTask();
  app.get("/tasks/all", QueryTaskController.queryAllTasks);
  app.get("/tasks/date/:day/:month/:year", QueryTaskController.queryByTheFullDate);
  app.get("/tasks/month/:month/:year", QueryTaskController.queryByTheMonth);  
  app.get("/tasks/year/:year", QueryTaskController.queryByTheYear);
  app.get("/tasks/done/:condition", QueryTaskController.queryDoneOrNotTasks);
  app.get("/tasks/delayed", QueryTaskController.queryOverdueTasks);
  app.get("/tasks/notifications/:daysOfDelay/:type", QueryTaskController.notificationOfTasksNearTheDeadline);

  const DeleteTaskController: any = new DeleteTask();
  app.delete("/tasks/delete/all", DeleteTaskController.deletedAllTasks);
  app.delete("/tasks/delete/:id", DeleteTaskController.deletedTask);

  const TrashTasksController: any = new TrashTasks();
  app.post("/tasks/trash/save/:id", TrashTasksController.createTrashTask);
  app.get("tasks/trash/all", TrashTasksController.consultAllTrashTasks);

  const DeleteTrashController: any = new TrashDelete();
  app.delete("/tasks/delete/trash/:id", DeleteTrashController.deletedTrashTask);
  app.delete("/tasks/delete/trash/all",DeleteTrashController.deletedAllTrashTasks);

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
