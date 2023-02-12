import { OverdueTasks } from "../../use-cases/query-cases/Get-overdue";
import { QueryAllTasks } from "../../use-cases/query-cases/Get-all";
import { QueryByFullDate } from "../../use-cases/query-cases/Get-full-date";
import { QueryByMonth } from "../../use-cases/query-cases/Get-month";
import { QueryByYear } from "../../use-cases/query-cases/Get-year";
import { TasksCondition } from "../../use-cases/query-cases/Get-status";
import { Task } from "../../entities/Task";
import { TaskBody } from "../dtos/create-task-body";

export class QueryTask {
  getAllTasks = async (
    req: Request,
    res: {
      json: (arg0: Task[] | object) => Promise<TaskBody>;
    }
  ) => {
    return res.json(await QueryAllTasks.execute());
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

    return res.json(await tasksByFullDate.execute());
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

    return res.json(await tasksByMonth.execute());
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

    return res.json(await tasksByYear.execute());
  };

  getDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (arg0: Task | object) => Promise<TaskBody>;
    }
  ) => {
    const tasksCondition = new TasksCondition(Number(req.params.condition));
    return res.json(await tasksCondition.execute());
  };

  getOverdueTasks = async (
    req: Request,
    res: {
      json: (arg0: Task[] | object) => Promise<TaskBody>;
    }
  ) => {
    const overdueTasks: OverdueTasks = new OverdueTasks();
    return res.json(await overdueTasks.execute());
  };
}
