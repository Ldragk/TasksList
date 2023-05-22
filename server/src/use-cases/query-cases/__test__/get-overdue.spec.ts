import { describe, it, expect, vi } from "vitest";
import { LimitDate } from "../../../entities/task-entities/limitDate";
import { InMemoryQueryRepository } from "../../../repositories/in-memory-repository/in-memory-query-repository";
import { MakeTask } from "../../../test/factories/task-factory";
import { OverdueTasks } from "../get-overdue";

describe("get by overdue", () => {
  it("should return all overdue tasks", async () => {
    const tasksRepository = new InMemoryQueryRepository();
    const overdueTasks = new OverdueTasks(tasksRepository);

    let OverdueTask = MakeTask({ date: new LimitDate("02/23/2023") });
    let task = MakeTask({ date: new LimitDate("02/23/3024") });

    const called = vi.spyOn(tasksRepository, "create");

    await tasksRepository.create(OverdueTask);
    await tasksRepository.create(OverdueTask);
    await tasksRepository.create(task);

    const { tasks } = await overdueTasks.execute();

    expect(tasksRepository.tasks[0].date.value).toEqual(OverdueTask.date.value);
    expect(overdueTasks.execute()).toEqual(Promise.resolve([OverdueTask]));
    expect(called).toHaveBeenCalledTimes(3);
    expect(tasksRepository.tasks).toHaveLength(3);
    expect(tasks).toHaveLength(2);
  });
});
