import { LimitDate } from "@src/entities/task-entities/limitDate";
import { InMemoryNotificationRepository } from "@src/repositories/in-memory-repository/in-memory-notification-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { convertExcessDaysAtTheTurnOfTheMonth } from "../functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "../functions/numberOfDaysInTheMonth";
import { NotificationOfTasksNearTheDeadline } from "../notifications-deadline";

describe("get by notification in deadline", () => {
  it("should return all tasks in a deadline", async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const notificationOfTasksNearTheDeadline =
      new NotificationOfTasksNearTheDeadline(notificationsRepository);

    const date = convertExcessDaysAtTheTurnOfTheMonth(
      numberOfDaysInTheMonth(String(new Date())),
      10
    );

    const task = MakeTask({ date: new LimitDate("02/02/3021") });
    const taskGet = MakeTask({
      date: new LimitDate(date),
    });

    const called = vi.spyOn(notificationsRepository, "create");

    await notificationsRepository.create(task);
    await notificationsRepository.create(task);
    await notificationsRepository.create(taskGet);

    const { notification } = await notificationOfTasksNearTheDeadline.execute({
      notificationsWithinThePeriod: 15,
      type: 0,
    });

    expect(notificationsRepository.tasks[2].date.value).toEqual(
      taskGet.date.value
    );
    expect(called).toHaveBeenCalledTimes(3);
    expect(notificationsRepository.tasks).toHaveLength(3);
    expect(notification).toHaveLength(1);
  });
});
