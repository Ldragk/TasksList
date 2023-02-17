import { Task } from "../../entities/Task";
import { TaskStatus } from "../../use-cases/manage-cases/Patch-chance-condition";
import { CreateTask } from "../../use-cases/manage-cases/Post-create";
import { FullUpdate } from "../../use-cases/manage-cases/Put-full-update";
import { TaskBody } from "../dtos/create-task-body";
import { TaskViewModel } from "../view-models/Task-view-model";

export class ManageTasks {
  async createTask(
    req: { body: TaskBody },
    res: { json: (arg0: TaskViewModel) => Promise<Task> }
  ) {
    const { title, description, limitDay, limitMonth, limitYear, done } =
      req.body;
    const { task } = await CreateTask.execute({
      title,
      description,
      limitDay,
      limitMonth,
      limitYear,
      done,
    });

    return { task: res.json(TaskViewModel.toHTTP(task)) };
  }

  async updateCondition(
    req: { params: { id: string } },
    res: { json: (arg0: TaskViewModel) => Promise<Task> }
  ) {
    const id: string = req.params.id;
    const { task } = await TaskStatus.execute(id);

    return { task: res.json(TaskViewModel.toHTTP(task)) };
  }

  async updateTasks(
    req: {
      params: { id: string };
      body: TaskBody;
    },
    res: { json: (arg0: TaskViewModel) => Promise<Task> }
  ) {
    const id: string = req.params.id;
    const { title, description, limitDay, limitMonth, limitYear, done } =
      req.body;
    const { task } = await FullUpdate.execute(id, {
      title,
      description,
      limitDay,
      limitMonth,
      limitYear,
      done,
    });

    return { task: res.json(TaskViewModel.toHTTP(task)) };
  }
}
