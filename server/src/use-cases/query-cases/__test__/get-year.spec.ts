import { describe, it, expect, vi, afterAll, beforeAll } from "vitest";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { MakeTask } from "@src/test/factories/task-factory";
import { QueryByYear } from "../get-year";


describe("get by year", () => {

  it("should return all tasks in a year", async () => {
    const tasksRepositoryMock: any = {
      create: vi.fn(),
      findByYear: vi.fn(),
      findAllTasks: vi.fn(),
      findByFullDate: vi.fn(),
      findByMonth: vi.fn(),
      findByStatus: vi.fn(),
      findByOverdue: vi.fn(),
    };

    const queryByYear = new QueryByYear(tasksRepositoryMock);
    const task = MakeTask();
    const taskGet = MakeTask({ date: new LimitDate("3/23/2025") });

    await tasksRepositoryMock.create(task);
    await tasksRepositoryMock.create(task);
    await tasksRepositoryMock.create(taskGet);

    tasksRepositoryMock.findByYear.mockResolvedValueOnce([task]);
    tasksRepositoryMock.findAllTasks.mockResolvedValueOnce([task, task, taskGet]);

    const { tasks } = await queryByYear.execute({ year: 2025 });

    expect(tasksRepositoryMock.create).toHaveBeenCalledTimes(3);
    expect(tasksRepositoryMock.findByYear).toHaveBeenCalledWith(2025);
    expect(tasksRepositoryMock.findByYear).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual([task]);
    expect(tasks).toHaveLength(1);
    await expect(tasksRepositoryMock.findAllTasks()).resolves.toHaveLength(3);
  });
});
