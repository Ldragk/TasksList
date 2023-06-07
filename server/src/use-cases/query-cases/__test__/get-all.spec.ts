import { describe, it, expect, vi } from "vitest";
import { InMemoryQueryRepository } from "@src/repositories/in-memory-repository/in-memory-query-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { QueryAllTasks } from "../get-all";

describe("get all", () => {
  it("should get all tasks", async () => {
    const tasksRepository = new InMemoryQueryRepository();
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

  it("should get all tasks", async () => {
    const tasksQueryRepositoryMock = {
      create: vi.fn(),
      findByYear: vi.fn(),
      findAllTasks: vi.fn(),
      findByFullDate: vi.fn(),
      findByMonth: vi.fn(),
      findByStatus: vi.fn(),
      findByOverdue: vi.fn(),
    };

    const getAll = new QueryAllTasks(tasksQueryRepositoryMock);
    const task = MakeTask();

    for (let i = 0; i < 10; i++) {
      await tasksQueryRepositoryMock.create(task);
    }
    tasksQueryRepositoryMock.findAllTasks.mockResolvedValue(Array(10).fill(task));

    const { tasks } = await getAll.execute();

    expect(tasksQueryRepositoryMock.create).toHaveBeenCalledTimes(10);
    expect(tasks[0]).toEqual(task);
    await expect(tasksQueryRepositoryMock.findAllTasks()).resolves.toHaveLength(10);
  });
});
