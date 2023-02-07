import { OverdueTasks } from "../../use-cases/query-cases/Get-overdue";
import { QueryAllTasks } from "../../use-cases/query-cases/Get-all";
import { QueryByFullDate } from "../../use-cases/query-cases/Get-full-date";
import { QueryByMonth } from "../../use-cases/query-cases/Get-month";
import { QueryByYear } from "../../use-cases/query-cases/Get-year";
import { TasksCondition } from "../../use-cases/query-cases/Get-status";

export class QueryTask {
  getAllTasks = async (
    req: Request,
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    const allTasks = new QueryAllTasks();
    return res.json(await allTasks.allTasks());
  };

  getByFullDate = async (
    req: { params: { day: string; month: string; year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    const tasksByFullDate: QueryByFullDate = new QueryByFullDate({
      day: Number(req.params.day),
      month: Number(req.params.month),
      year: Number(req.params.year),
    });

    return res.json(await tasksByFullDate.tasksByFullDate());
  };

  getByMonth = async (
    req: { params: { month: string; year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    const tasksByMonth: QueryByMonth = new QueryByMonth({
      month: Number(req.params.month),
      year: Number(req.params.year),
    });

    return res.json(await tasksByMonth.tasksByMonth());
  };

  getByYear = async (
    req: { params: { year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    const tasksByYear: QueryByYear = new QueryByYear({
      year: Number(req.params.year),
    });

    return res.json(await tasksByYear.tasksByYear());
  };

  getDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (arg0: object) => JSON;
    }
  ) => {
    const tasksCondition: TasksCondition = new TasksCondition(
      Number(req.params.condition)
    );
    return res.json(await tasksCondition.doneOrNot());
  };

  getOverdueTasks = async (
    req: Request,
    res: {
      json: (arg0: object[] | object) => JSON;
    }
  ) => {
    const overdueTasks: OverdueTasks = new OverdueTasks();
    return res.json(await overdueTasks.consultOverdueTasks());
  };
}
