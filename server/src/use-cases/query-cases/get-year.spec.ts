import { describe, it, expect, vi } from "vitest";
import { LimitDate } from "../../entities/task-entities/LimitDate";
import { InMemoryFindRepository } from "../../repositories/in-memory-repository/in-memory-find-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { QueryByYear } from "./Get-year";

describe("get by year", () => {
  it("should return all tasks in a year", async () => {
    const tasksRepository = new InMemoryFindRepository();
    const queryByYear = new QueryByYear(tasksRepository);

    let task = MakeTask();
    let taskGet = MakeTask({ date: new LimitDate("3/23/2025") });

    const called = vi.spyOn(tasksRepository, "create");

    await tasksRepository.create(task);
    await tasksRepository.create(task);
    await tasksRepository.create(taskGet);

    const { tasks } = await queryByYear.execute({ year: 2025 });

    expect(tasksRepository.tasks[2].date.value).toEqual(taskGet.date.value);
    expect(
      queryByYear.execute({
        year: task.date.yearValue,
      })
    ).toEqual(Promise.resolve([task]));
    expect(called).toHaveBeenCalledTimes(3);
    expect(tasksRepository.tasks).toHaveLength(3);
    expect(tasks).toHaveLength(1);
  });
});
