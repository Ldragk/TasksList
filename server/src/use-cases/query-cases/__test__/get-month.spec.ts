import { describe, it, expect, vi } from "vitest";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { MakeTask } from "@src/test/factories/task-factory";
import { QueryByMonth } from "../get-month";
import { InMemoryQueryRepository } from "@src/repositories/in-memory-repository/in-memory-query-repository";

describe("get by month", () => {

  it("should return all tasks in the selected month", async () => {
    const tasksQueryRepositoryMock = {
      create: vi.fn(),
      findByYear: vi.fn(),
      findAllTasks: vi.fn(),
      findByFullDate: vi.fn(),
      findByMonth: vi.fn(),
      findByStatus: vi.fn(),
      findByOverdue: vi.fn(),
    };

    const queryByMonth = new QueryByMonth(tasksQueryRepositoryMock);
    const task = MakeTask();
    const task1 = MakeTask();
    const taskNotGet = MakeTask({ date: new LimitDate("3/23/2024") });

    await tasksQueryRepositoryMock.create(task);
    await tasksQueryRepositoryMock.create(task1);
    await tasksQueryRepositoryMock.create(taskNotGet);

    tasksQueryRepositoryMock.findByMonth.mockResolvedValue([task, task1]);
    tasksQueryRepositoryMock.findAllTasks.mockResolvedValueOnce([task, task, taskNotGet]);

    const { tasks } = await queryByMonth.execute({ month: 2, year: 2024 });

    expect(tasksQueryRepositoryMock.create).toHaveBeenCalledTimes(3);
    expect(tasksQueryRepositoryMock.findByMonth).toHaveBeenCalledWith(2, 2024)
    expect(tasksQueryRepositoryMock.findByMonth).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual([task, task1]);
    expect(await tasksQueryRepositoryMock.findByMonth(2, 2024)).toHaveLength(2);
    await expect(tasksQueryRepositoryMock.findAllTasks()).resolves.toHaveLength(3);
  });

  it("should return all tasks in the selected month", async () => {
    const tasksRepository = new InMemoryQueryRepository();
    const queryByMonth = new QueryByMonth(tasksRepository);

    const task = MakeTask();
    const taskNotGet = MakeTask({ date: new LimitDate("3/23/2024") });

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
