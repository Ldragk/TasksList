import { NotificationOfTasksNearTheDeadline } from "../../use-cases/queryCases/Check-notification";
import { DelayedTasks } from "../../use-cases/queryCases/Delayed-tasks";
import { QueryAllTasks } from "../../use-cases/queryCases/Query-all";
import { QueryByTheFullDate } from "../../use-cases/queryCases/Query-full-date";
import { QueryByTheMonth } from "../../use-cases/queryCases/Query-month";
import { QueryByTheYear } from "../../use-cases/queryCases/Query-year";
import { TasksCondition } from "../../use-cases/queryCases/Tasks-condition";

export class QueryTask {
  allTasks!: QueryAllTasks;
  tasksByTheFullDate!: QueryByTheFullDate;
  tasksByTheMonth!: QueryByTheMonth;
  tasksByTheYear!: QueryByTheYear;
  tasksCondition!: TasksCondition;
  delayedTasks!: DelayedTasks;
  daysInAdvanceForNotification!: number;
  notifications!: NotificationOfTasksNearTheDeadline;
  notificationsWithinTheNotificationPeriod!: object;

  queryAllTasks = async (
    req: Request,
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.allTasks = new QueryAllTasks();
    return res.json(await this.allTasks.allTasks());
  };

  queryByTheFullDate = async (
    req: { params: { day: string; month: string; year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.tasksByTheFullDate = new QueryByTheFullDate({
      day: Number(req.params.day),
      month: Number(req.params.month),
      year: Number(req.params.year),
    });

    return res.json(await this.tasksByTheFullDate.tasksByTheFullDate());
  };

  queryByTheMonth = async (
    req: { params: { month: string; year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.tasksByTheMonth = new QueryByTheMonth({
      month: Number(req.params.month),
      year: Number(req.params.year),
    });

    return res.json(await this.tasksByTheMonth.tasksByTheMonth());
  };

  queryByTheYear = async (
    req: { params: { year: string } },
    res: {
      json: (arg0: object[] | object) => Response;
    }
  ) => {
    this.tasksByTheYear = new QueryByTheYear({
      year: Number(req.params.year),
    });

    return res.json(await this.tasksByTheYear.tasksByTheYear());
  };

  queryDoneOrNotTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (arg0: object) => JSON;
    }
  ) => {
    this.tasksCondition = new TasksCondition(Number(req.params.condition));
    return res.json(await this.tasksCondition.doneOrNot());
  };

  queryDelayedTasks = async (
    req: Request,
    res: {
      json: (arg0: object[] | { message: string }) => JSON;
    }
  ) => {
    this.delayedTasks = new DelayedTasks();
    return res.json(await this.delayedTasks.consultDelayedTasks());
  };

  notificationOfTasksNearTheDeadline = async (
    req: { params: { daysOfDelay: number } },
    res: {
      json: (arg0: object) => JSON;
    }
  ) => {
    this.daysInAdvanceForNotification = req.params.daysOfDelay;
    this.notifications = new NotificationOfTasksNearTheDeadline(
      this.daysInAdvanceForNotification
    );
    this.notificationsWithinTheNotificationPeriod =
      await this.notifications.sendNotification();
    return res.json(this.notificationsWithinTheNotificationPeriod);
  };
}
