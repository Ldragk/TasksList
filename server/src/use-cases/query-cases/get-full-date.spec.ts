import { describe, it, expect, vi } from "vitest";
import { InMemoryFindRepository } from "../../repositories/in-memory-repository/in-memory-find-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { QueryByFullDate } from "./Get-full-date";

describe("Get full date", () => {
  it("should return all tasks", async () => {
    const taskRepository = new InMemoryFindRepository();
    const queryByFullDate = new QueryByFullDate(taskRepository);
    const task = MakeTask();

    const returnTask = vi.spyOn(taskRepository, "create");

    await taskRepository.create(task);
    await taskRepository.create(task);
    await taskRepository.create(task);

    const { tasks } = await queryByFullDate.execute({ date: task.date.value });

    expect(taskRepository.tasks[0].date.value).toEqual(task.date.value);
    expect(queryByFullDate.execute({ date: task.date.value })).toEqual(
      Promise.resolve([task])
    );
    expect(returnTask).toHaveBeenCalledTimes(3);
    expect(taskRepository.tasks).toHaveLength(3);
    expect(tasks).toHaveLength(3);
  });
});
