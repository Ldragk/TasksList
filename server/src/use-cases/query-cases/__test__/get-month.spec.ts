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
    const taskNotGet = MakeTask({ date: new LimitDate("3/23/2024") });

    for (let i = 0; i < 3; i++) {
      await tasksQueryRepositoryMock.create(task);
    }
    await tasksQueryRepositoryMock.create(taskNotGet);

    tasksQueryRepositoryMock.findByMonth.mockResolvedValue(Array(3).fill(task));

    const getTasks = Array(3).fill(task);
    const fullGetTasks = getTasks.concat(taskNotGet);
    tasksQueryRepositoryMock.findAllTasks.mockResolvedValueOnce(fullGetTasks);

    const { tasks } = await queryByMonth.execute({ month: 2, year: 2024 });

    expect(tasksQueryRepositoryMock.create).toHaveBeenCalledTimes(4);
    expect(tasksQueryRepositoryMock.findByMonth).toHaveBeenCalledWith(2, 2024)
    expect(tasksQueryRepositoryMock.findByMonth).toHaveBeenCalledTimes(1);
    expect([...tasks]).toEqual([task, task, task]);
    expect(await tasksQueryRepositoryMock.findByMonth(2, 2024)).toHaveLength(3);
    await expect(tasksQueryRepositoryMock.findAllTasks()).resolves.toHaveLength(4);
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
