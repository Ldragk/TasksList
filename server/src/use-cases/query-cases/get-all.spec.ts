import { describe, it, expect, vi } from "vitest";
import { InMemoryFindRepository } from "../../repositories/in-memory-repository/in-memory-find-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { QueryAllTasks } from "./Get-all";

describe("get all", () => {
  it("should get all tasks", async () => {
    const tasksRepository = new InMemoryFindRepository();
    const getAll = new QueryAllTasks(tasksRepository);
    const task = MakeTask();

    const calledTask = vi.spyOn(tasksRepository, "create");

    await tasksRepository.create(task);
    await tasksRepository.create(task);
    const { tasks } = await getAll.execute();

    expect(calledTask).toHaveBeenCalledTimes(2);
    expect(tasksRepository.tasks).toHaveLength(2);
    expect(tasksRepository.tasks).toEqual([task, task]);
    expect(getAll.execute()).toEqual(Promise.resolve([task]));
    expect(tasks).toHaveLength(2);
  });
});
