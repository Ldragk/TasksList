import { OverdueTasks } from "../../use-cases/queryCases/Get-overdue";
import { QueryAllTasks } from "../../use-cases/queryCases/Get-all";
import { QueryByFullDate } from "../../use-cases/queryCases/Get-full-date";
import { QueryByMonth } from "../../use-cases/queryCases/Get-month";
import { QueryByYear } from "../../use-cases/queryCases/Get-year";
import { TasksCondition } from "../../use-cases/queryCases/Get-status";

export class QueryTask {
  allTasks!: QueryAllTasks;
  tasksByFullDate!: QueryByFullDate;
  tasksByMonth!: QueryByMonth;
  tasksByYear!: QueryByYear;
  tasksCondition!: TasksCondition;
  overdueTasks!: OverdueTasks;

  getAllTasks = async (
    req: Request,
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.allTasks = new QueryAllTasks();
    return res.json(await this.allTasks.allTasks());
  };

  getByFullDate = async (
    req: { params: { day: string; month: string; year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.tasksByFullDate = new QueryByFullDate({
      day: Number(req.params.day),
      month: Number(req.params.month),
      year: Number(req.params.year),
    });

    return res.json(await this.tasksByFullDate.tasksByFullDate());
  };

  getByMonth = async (
    req: { params: { month: string; year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.tasksByMonth = new QueryByMonth({
      month: Number(req.params.month),
      year: Number(req.params.year),
    });

    return res.json(await this.tasksByMonth.tasksByMonth());
  };

  getByYear = async (
    req: { params: { year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.tasksByYear = new QueryByYear({
      year: Number(req.params.year),
    });

    return res.json(await this.tasksByYear.tasksByYear());
  };

  getDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (arg0: object) => JSON;
    }
  ) => {
    this.tasksCondition = new TasksCondition(Number(req.params.condition));
    return res.json(await this.tasksCondition.doneOrNot());
  };

  getOverdueTasks = async (
    req: Request,
    res: {
      json: (arg0: object[] | { message: string }) => JSON;
    }
  ) => {
    this.overdueTasks = new OverdueTasks();
    return res.json(await this.overdueTasks.consultOverdueTasks());
  };
}
