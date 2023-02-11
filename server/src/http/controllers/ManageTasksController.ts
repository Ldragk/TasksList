import { Task } from "../../entities/Task";
import { TaskCondition } from "../../use-cases/manage-cases/Patch-chance-condition";
import { CreateTask } from "../../use-cases/manage-cases/Post-create";
import { FullUpdate } from "../../use-cases/manage-cases/Put-full-update";
import { TaskBody } from "../dtos/create-task-body";

export class ManageTasks {
  async createTask(
    req: {
      body: Task;
      id: string;
    },
    res: { json: (arg0: TaskBody) => Task }
  ): Promise<Task> {
    const taskToBeCreate = await CreateTask.execute(
      {
        title: req.body.title,
        description: req.body.description,
        limitDay: req.body.limitDay,
        limitMonth: req.body.limitMonth,
        limitYear: req.body.limitYear,
        done: req.body.done,
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
      body: Task;
      params: { id: string };
    },
    res: { json: (arg0: TaskBody | object) => Promise<TaskBody> }
  ) {
    const id: string = req.params.id;
    const body: Task = req.body;
    const taskUpdate = await FullUpdate.execute(body, id);

    return res.json(taskUpdate);
  }
}
