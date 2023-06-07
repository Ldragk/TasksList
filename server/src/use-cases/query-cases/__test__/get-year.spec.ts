import { describe, it, expect, vi } from "vitest";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { MakeTask } from "@src/test/factories/task-factory";
import { QueryByYear } from "../get-year";
import { InMemoryQueryRepository } from "@src/repositories/in-memory-repository/in-memory-query-repository";

describe("get by year", () => {

  it("should return all tasks in the selected year", async () => {
    const tasksRepositoryMock = {
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

    const getTasks = Array(2).fill(task);
    const fullGetTasks = getTasks.concat(taskGet);
    tasksRepositoryMock.findAllTasks.mockResolvedValueOnce(fullGetTasks);

    const { tasks } = await queryByYear.execute({ year: 2025 });

    expect(tasksRepositoryMock.create).toHaveBeenCalledTimes(3);
    expect(tasksRepositoryMock.findByYear).toHaveBeenCalledWith(2025);
    expect(tasksRepositoryMock.findByYear).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual([task]);
    expect(tasks).toHaveLength(1);
    await expect(tasksRepositoryMock.findAllTasks()).resolves.toHaveLength(3);
  });

  it("should return all tasks in the selected year", async () => {
    const tasksRepository = new InMemoryQueryRepository();
    const queryByYear = new QueryByYear(tasksRepository);

    const task = MakeTask();
    const taskGet = MakeTask({ date: new LimitDate("3/23/2025") });

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
    expect([...tasks]).toEqual([taskGet]);
    expect(tasks).toHaveLength(1);
  });
});
