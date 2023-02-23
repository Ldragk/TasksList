import { Task } from "../../entities/Task";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { TaskStatus } from "../../use-cases/manage-cases/Patch-chance-condition";
import { CreateTask } from "../../use-cases/manage-cases/Post-create";
import { FullUpdate } from "../../use-cases/manage-cases/Put-full-update";
import { TaskBody } from "../dtos/create-task-body";
import { TaskViewModel } from "../view-models/Task-view-model";

export class ManageTasks {


  

  async create(
    req: { body: TaskBody },
    res: { json: (arg0: TaskViewModel) => Promise<Task> }
  ) {
    const { title, content, date, done } = req.body;
    const createTask = new CreateTask(new PrismaManageRepository());
    const { task } = await createTask.execute({
      title,
      content,
      date,
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
    const { title, content, date, done } = req.body;
    const { task } = await FullUpdate.execute(id, {
      title,
      content,
      date,
      done,
    });

    return { task: res.json(TaskViewModel.toHTTP(task)) };
  }
}
