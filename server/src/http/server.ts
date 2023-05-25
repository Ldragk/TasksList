import express from "express";
import cors from "cors";
import { DeleteTasks } from "./controllers/delete-task-controller";
import { QueryTask } from "./controllers/get-task-controller";
import { ManageTasks } from "./controllers/manage-tasks-controller";
import { Notifications } from "./controllers/notifications-controller";
import { TrashTasks } from "./controllers/trash-controller";

const app = express();

app.use(express.json());
app.use(cors());

async function App() {
  
  const manageTasksController: any = new ManageTasks();
  app.post("/tasks/create", manageTasksController.create);
  app.patch("/tasks/change/:id/", manageTasksController.updateCondition);
  app.put("/tasks/fullChange/:id/", manageTasksController.updateTasks);

  const queryTaskController: any = new QueryTask();
  app.get("/tasks/all", queryTaskController.getAllTasks);
  app.get("/tasks/date/:day/:month/:year", queryTaskController.getByFullDate);
  app.get("/tasks/month/:month/:year", queryTaskController.getByMonth);
  app.get("/tasks/year/:year", queryTaskController.getByYear);
  app.get("/tasks/done/:condition", queryTaskController.getDoneOrNotTasks);
  app.get("/tasks/delayed", queryTaskController.getOverdueTasks);

  const notificationsController: any = new Notifications();
  app.get(
    "/tasks/notifications/:daysOfDelay/:type",
    notificationsController.notificationOfTasksNearTheDeadline
  );

  const deleteTaskController: any = new DeleteTasks();
  app.delete("/tasks/delete/all", deleteTaskController.deletedAllTasks);
  app.delete("/tasks/delete/:id", deleteTaskController.deleteTask);

  const trashController: any = new TrashTasks();
  app.get("/trash/all", trashController.findAllTrashTasks);  
  app.delete("/trash/:id/delete", trashController.deletedTrashTask);
  app.delete("/trash/delete/all", trashController.deletedAllTrashTasks);

  const server: number = 3333;
  app.listen(server, () => console.log(`server is running on port ${server}`));
}

export default App;


