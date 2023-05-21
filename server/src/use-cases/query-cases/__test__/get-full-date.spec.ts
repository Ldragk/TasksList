import { describe, it, expect, vi } from "vitest";
import { LimitDate } from "../../../entities/task-entities/limitDate";
import { InMemoryFindRepository } from "../../../repositories/in-memory-repository/in-memory-find-repository";
import { MakeTask } from "../../../test/factories/task-factory";
import { QueryByFullDate } from "../get-full-date";

describe("Get full date", () => {
  it("should return all tasks with parameter date", async () => {
    const tasksRepository = new InMemoryFindRepository();
    const queryByFullDate = new QueryByFullDate(tasksRepository);
    const task = MakeTask();
    const taskNotGet = MakeTask({ date: new LimitDate("02/24/2024") });

    const called = vi.spyOn(tasksRepository, "create");

    await tasksRepository.create(task);
    await tasksRepository.create(task);
    await tasksRepository.create(task);
    await tasksRepository.create(taskNotGet);

    const { tasks } = await queryByFullDate.execute({ date: task.date.value });

    expect(tasksRepository.tasks[0].date.value).toEqual(task.date.value);
    expect(queryByFullDate.execute({ date: task.date.value })).toEqual(
      Promise.resolve([task])
    );
    expect(called).toHaveBeenCalledTimes(4);
    expect(tasksRepository.tasks).toHaveLength(4);
    expect(tasks).toHaveLength(3);
  });
});
