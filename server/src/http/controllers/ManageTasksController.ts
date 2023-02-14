import { Task } from "../../entities/Task";
import { TaskCondition } from "../../use-cases/manage-cases/Patch-chance-condition";
import { CreateTask } from "../../use-cases/manage-cases/Post-create";
import { FullUpdate } from "../../use-cases/manage-cases/Put-full-update";
import { TaskBody } from "../dtos/create-task-body";

export class ManageTasks {
  async createTask(
    req: {
      body: TaskBody;
      id: string;
    },
    res: { json: (arg0: TaskBody) => TaskBody }
  ): Promise<TaskBody> {
    const { title, description, limitDay, limitMonth, limitYear, done } =
      req.body;
    const taskToBeCreate = await CreateTask.execute(
      {
        title,
        description,
        limitDay,
        limitMonth,
        limitYear,
        done,
      },
      req.id
    );

    return res.json(taskToBeCreate);
  }

  async updateCondition(
    req: { params: { id: string } },
    res: { json: (arg0: TaskBody | object) => Promise<TaskBody> }
  ) {
    const id: string = req.params.id;
    const taskUpdate = await TaskCondition.execute(id);

    return res.json(taskUpdate);
  }

  async updateTasks(
    req: {
      body: TaskBody;
      params: { id: string };
    },
    res: { json: (arg0: TaskBody | object) => Promise<Task> }
  ) {
    const id: string = req.params.id;
    const body: TaskBody = req.body;
    const taskUpdate = await FullUpdate.execute(body, id);

    return res.json(taskUpdate);
  }
}
