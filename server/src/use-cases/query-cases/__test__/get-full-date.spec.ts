import { LimitDate } from "@src/entities/task-entities/limitDate";
import { InMemoryQueryRepository } from "@src/repositories/in-memory-repository/in-memory-query-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { QueryByFullDate } from "../get-full-date";

describe("Get full date", () => {

  it("should return all tasks with parameter date", async () => {
    const tasksRepository = new InMemoryQueryRepository();
    const queryByFullDate = new QueryByFullDate(tasksRepository);
    const task = MakeTask();
    const taskNotGet = MakeTask({ date: new LimitDate("02/24/2024") });

    const called = vi.spyOn(tasksRepository, "create");

    for (let i = 0; i < 3; i++) {
      await tasksRepository.create(task);
    }
    await tasksRepository.create(taskNotGet);

    const { tasks } = await queryByFullDate.execute(task.userId, { date: task.date.value });

    expect(tasksRepository.tasks[0].date.value).toEqual(task.date.value);
    expect(queryByFullDate.execute(task.userId, { date: task.date.value })).toEqual(
      Promise.resolve([task])
    );
    expect(called).toHaveBeenCalledTimes(4);
    expect(tasksRepository.tasks).toHaveLength(4);
    expect(tasks).toHaveLength(3);
  });

  it("should return all tasks with parameter date", async () => {
    const tasksQueryRepositoryMock = {
      create: vi.fn(),
      findByYear: vi.fn(),
      findAllTasks: vi.fn(),
      findByFullDate: vi.fn(),
      findByMonth: vi.fn(),
      findByStatus: vi.fn(),
      findByOverdue: vi.fn(),
    };

    const queryByFullDate = new QueryByFullDate(tasksQueryRepositoryMock);

    const task = MakeTask();
    const taskNotGet = MakeTask({ date: new LimitDate("02/24/2024") });

    for (let i = 0; i < 3; i++) {
      await tasksQueryRepositoryMock.create(task);
    }
    await tasksQueryRepositoryMock.create(taskNotGet);

    tasksQueryRepositoryMock.findByFullDate.mockResolvedValue(Array(3).fill(task));

    const getTasks = Array(3).fill(task);
    const fullGetTasks = getTasks.concat(taskNotGet);
    tasksQueryRepositoryMock.findAllTasks.mockResolvedValueOnce(fullGetTasks);

    const { tasks } = await queryByFullDate.execute(task.userId, { date: "02/24/2024" });

    expect(tasksQueryRepositoryMock.create).toHaveBeenCalledTimes(4);
    expect(tasksQueryRepositoryMock.findByFullDate).toHaveBeenCalledWith(task.userId, "02/24/2024")
    expect(tasksQueryRepositoryMock.findByFullDate).toHaveBeenCalledTimes(1);
    expect([...tasks]).toEqual([task, task, task]);
    expect(await tasksQueryRepositoryMock.findByFullDate("02/24/2024")).toHaveLength(3);
    await expect(tasksQueryRepositoryMock.findAllTasks()).resolves.toHaveLength(4);
  });
});
