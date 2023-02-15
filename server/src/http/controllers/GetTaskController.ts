import { OverdueTasks } from "../../use-cases/query-cases/Get-overdue";
import { QueryAllTasks } from "../../use-cases/query-cases/Get-all";
import { QueryByFullDate } from "../../use-cases/query-cases/Get-full-date";
import { QueryByMonth } from "../../use-cases/query-cases/Get-month";
import { QueryByYear } from "../../use-cases/query-cases/Get-year";
import { TasksCondition } from "../../use-cases/query-cases/Get-status";
import { Task } from "../../entities/Task";
import { TaskBody } from "../dtos/create-task-body";
import { TaskViewModel } from "../view-models/Task-view-model";

export class QueryTask {
  getAllTasks = async (
    req: Request,
    res: {
      json: (arg0: TaskViewModel) => Promise<Task>;
    }
  ) => {
    const tasks = await QueryAllTasks.execute();
    return res.json(tasks.map(TaskViewModel.toHTTP));
  };

  getByFullDate = async (
    req: { params: { day: string; month: string; year: string } },
    res: {
      json: (arg0: Task[] | object) => Promise<TaskBody>;
    }
  ) => {
    const tasksByFullDate: QueryByFullDate = new QueryByFullDate({
      day: Number(req.params.day),
      month: Number(req.params.month),
      year: Number(req.params.year),
    });

    const tasks = await tasksByFullDate.execute();
    return res.json(tasks.map(TaskViewModel.toHTTP));
  };

  getByMonth = async (
    req: { params: { month: string; year: string } },
    res: {
      json: (arg0: Task[] | object) => Promise<TaskBody>;
    }
  ) => {
    const tasksByMonth: QueryByMonth = new QueryByMonth({
      month: Number(req.params.month),
      year: Number(req.params.year),
    });
    const tasks = await tasksByMonth.execute();
    return res.json(tasks.map(TaskViewModel.toHTTP));
  };

  getByYear = async (
    req: { params: { year: string } },
    res: {
      json: (arg0: Task[] | object) => Promise<TaskBody>;
    }
  ) => {
    const tasksByYear: QueryByYear = new QueryByYear({
      year: Number(req.params.year),
    });
    const tasks = await tasksByYear.execute();
    return res.json(tasks.map(TaskViewModel.toHTTP));
  };

  getDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (arg0: Task | object) => Promise<TaskBody>;
    }
  ) => {
    const tasks = await TasksCondition.execute(Number(req.params.condition));
    return res.json(tasks.map(TaskViewModel.toHTTP));
  };

  getOverdueTasks = async (
    req: Request,
    res: {
      json: (arg0: Task[] | object) => Promise<TaskBody>;
    }
  ) => {
    const overdueTasks: OverdueTasks = new OverdueTasks();
    const tasks = await overdueTasks.execute();
    return res.json(tasks.map(TaskViewModel.toHTTP));
  };
}
