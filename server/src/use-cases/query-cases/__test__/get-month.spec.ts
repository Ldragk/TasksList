import { describe, it, expect, vi } from "vitest";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { MakeTask } from "@src/test/factories/task-factory";
import { QueryByMonth } from "../get-month";

describe("get by month", () => {

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

    const queryByMonth = new QueryByMonth(tasksRepositoryMock);
    const task = MakeTask();
    const taskNotGet = MakeTask({ date: new LimitDate("3/23/2024") });

    await tasksRepositoryMock.create(task);
    await tasksRepositoryMock.create(task);
    await tasksRepositoryMock.create(taskNotGet);

    tasksRepositoryMock.findByMonth.mockResolvedValueOnce([task]);
    tasksRepositoryMock.findAllTasks.mockResolvedValueOnce([task, task, taskNotGet]);

    const { tasks } = await queryByMonth.execute({ month: 2, year: 2024 });

    expect(tasksRepositoryMock.create).toHaveBeenCalledTimes(3);
    expect(tasksRepositoryMock.findByMonth).toHaveBeenCalledWith(2, 2024);
    expect(tasksRepositoryMock.findByMonth).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual([task]);
    expect(tasks).toHaveLength(1);
    await expect(tasksRepositoryMock.findAllTasks()).resolves.toHaveLength(3);    
  });
});
