import { LimitDate } from "@src/entities/task-entities/limitDate";
import { InMemoryQueryRepository } from "@src/repositories/in-memory-repository/in-memory-query-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { OverdueTasks } from "../get-overdue";

describe("get by overdue", () => {
  it("should return all overdue tasks", async () => {
    const tasksRepository = new InMemoryQueryRepository();
    const overdueTasks = new OverdueTasks(tasksRepository);

    const OverdueTask = MakeTask({ date: new LimitDate("02/23/2023") });
    const task = MakeTask({ date: new LimitDate("02/23/3024") });

    const called = vi.spyOn(tasksRepository, "create");
    
    for(let i = 0; i < 3; i++) {
      await tasksRepository.create(OverdueTask);
    }
    await tasksRepository.create(task);

    const { tasks } = await overdueTasks.execute();

    expect(tasksRepository.tasks[0].date.value).toEqual(OverdueTask.date.value);
    expect(overdueTasks.execute()).toEqual(Promise.resolve([OverdueTask]));
    expect(called).toHaveBeenCalledTimes(4);
    expect(tasksRepository.tasks).toHaveLength(4);
    expect(tasks).toHaveLength(3);
  });

  it("should return all overdue tasks", async () => {
    const tasksQueryRepositoryMock = {
      create: vi.fn(),
      findByYear: vi.fn(),
      findAllTasks: vi.fn(),
      findByFullDate: vi.fn(),
      findByMonth: vi.fn(),
      findByStatus: vi.fn(),
      findByOverdue: vi.fn(),
    };
    const overdueTasks = new OverdueTasks(tasksQueryRepositoryMock);
    const overdueTask = MakeTask({ date: new LimitDate("02/23/2023") });
    const task = MakeTask({ date: new LimitDate("02/23/3024") });

    for (let i = 0; i < 3; i++) {
      await tasksQueryRepositoryMock.create(overdueTask);
    }
    await tasksQueryRepositoryMock.create(task)

    tasksQueryRepositoryMock.findByOverdue.mockResolvedValue(Array(3).fill(overdueTask));

    const getTasks = Array(3).fill(overdueTask);
    const fullGetTasks = getTasks.concat(task);
    tasksQueryRepositoryMock.findAllTasks.mockResolvedValueOnce(fullGetTasks);

    const { tasks } = await overdueTasks.execute();    
    
    expect(tasksQueryRepositoryMock.create).toHaveBeenCalledTimes(4);
    expect(tasksQueryRepositoryMock.findByOverdue).toHaveBeenCalledWith(false)
    expect(tasksQueryRepositoryMock.findByOverdue).toHaveBeenCalledTimes(1);
    expect([...tasks]).toEqual([overdueTask, overdueTask, overdueTask]);
    expect(await tasksQueryRepositoryMock.findByOverdue()).toHaveLength(3);
    await expect(tasksQueryRepositoryMock.findAllTasks()).resolves.toHaveLength(4);
  });
});
