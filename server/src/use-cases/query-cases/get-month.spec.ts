import { describe, it, expect, vi } from "vitest";
import { Task } from "../../entities/Task";
import { LimitDate } from "../../entities/task-entities/LimitDate";
import { InMemoryFindRepository } from "../../repositories/in-memory-repository/in-memory-find-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { QueryByMonth } from "./Get-month";

describe("get by month", () => {
  it("should return all tasks in a month", async () => {
    const tasksRepository = new InMemoryFindRepository();
    const queryByMonth = new QueryByMonth(tasksRepository);

    let task = MakeTask();
    let taskNotGet = MakeTask({ date: new LimitDate("3/23/2024") });

    const called = vi.spyOn(tasksRepository, "create");

  

    await tasksRepository.create(task);
    await tasksRepository.create(task);
    await tasksRepository.create(taskNotGet);

    const { tasks } = await queryByMonth.execute({ month: 2, year: 2024 });

    expect(tasksRepository.tasks[0].date.value).toEqual(task.date.value);
    expect(
      queryByMonth.execute({
        month: task.date.monthValue,
        year: task.date.yearValue,
      })
    ).toEqual(Promise.resolve([task]));
    expect(called).toHaveBeenCalledTimes(3);
    expect(tasksRepository.tasks).toHaveLength(3);
    expect(tasks).toHaveLength(2);
  });
});
