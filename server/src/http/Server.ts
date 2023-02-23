import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { DeleteTasks } from "./controllers/DeleteTaskController";
import { TrashDelete } from "./controllers/TrashDeleteController";
import { TrashTasks } from "./controllers/TrashTasksController";
import { ManageTasks } from "./controllers/ManageTasksController";
import { QueryTask } from "./controllers/GetTaskController";
import { Notifications } from "./controllers/NotificationsController";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

async function App() {
  const ManageTasksController: any = new ManageTasks();
  app.post("/tasks/create", ManageTasksController.create);
  app.patch("/tasks/change/:id/", ManageTasksController.updateCondition);
  app.put("/tasks/fullChange/:id/", ManageTasksController.updateTasks);

  const QueryTaskController: any = new QueryTask();
  app.get("/tasks/all", QueryTaskController.getAllTasks);
  app.get("/tasks/date/:day/:month/:year", QueryTaskController.getByFullDate);
  app.get("/tasks/month/:month/:year", QueryTaskController.getByMonth);
  app.get("/tasks/year/:year", QueryTaskController.getByYear);
  app.get("/tasks/done/:condition", QueryTaskController.getDoneOrNotTasks);
  app.get("/tasks/delayed", QueryTaskController.getOverdueTasks);

  const NotificationsController: any = new Notifications();
  app.get(
    "/tasks/notifications/:daysOfDelay/:type",
    NotificationsController.notificationOfTasksNearTheDeadline
  );

  const DeleteTaskController: any = new DeleteTasks();
  app.delete("/tasks/delete/all", DeleteTaskController.deletedAllTasks);
  app.delete("/tasks/delete/:id", DeleteTaskController.deleteTask);

  const TrashTasksController: any = new TrashTasks();
  app.get("/tasks/trash/all", TrashTasksController.queryAllTrashTasks);

  const DeleteTrashController: any = new TrashDelete();
  app.delete("/trash/:id/delete", DeleteTrashController.deletedTrashTask);
  app.delete("/trash/delete/all", DeleteTrashController.deletedAllTrashTasks);

  const Server: number = 3333;
  app.listen(Server, () => console.log(`Server is running on port ${Server}`));
}
App()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
