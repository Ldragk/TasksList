import { InMemoryQueryRepository } from "@src/repositories/in-memory-repository/in-memory-query-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { TasksCondition } from "../get-status";

describe("get by task status", () => {

  it("should return all tasks in a parameter true or false", async () => {
    const tasksRepository = new InMemoryQueryRepository();
    const tasksCondition = new TasksCondition(tasksRepository);

    const trueTask = MakeTask({ done: true });
    const falseTask = MakeTask();

    const called = vi.spyOn(tasksRepository, "create");

    for (let i = 0; i < 2; i++) {
      await tasksRepository.create(trueTask);
    }
    await tasksRepository.create(falseTask);

    const { tasks } = await tasksCondition.execute(trueTask.userId, 1);    

    expect(tasksRepository.tasks[0].date.value).toEqual(trueTask.date.value);
    expect(tasksCondition.execute(trueTask.userId, 1)).toEqual(Promise.resolve([trueTask]));
    expect(called).toHaveBeenCalledTimes(3);
    expect(tasksRepository.tasks).toHaveLength(3); 
    expect(tasks).toHaveLength(2);
  });

  it("should return all tasks in a parameter true or false", async () => {
    const tasksQueryRepositoryMock = {
      create: vi.fn(),
      findByYear: vi.fn(),
      findAllTasks: vi.fn(),
      findByFullDate: vi.fn(),
      findByMonth: vi.fn(),
      findByStatus: vi.fn(),
      findByOverdue: vi.fn(),
    };
    const tasksCondition = new TasksCondition(tasksQueryRepositoryMock);
    const trueTask = MakeTask({ done: true });
    const falseTask = MakeTask();

    for (let i = 0; i < 3; i++) {
      await tasksQueryRepositoryMock.create(falseTask);
    }
    await tasksQueryRepositoryMock.create(trueTask);

    tasksQueryRepositoryMock.findByStatus.mockResolvedValue(Array(3).fill(falseTask));

    const getTasks = Array(3).fill(falseTask);
    const fullGetTasks = getTasks.concat(trueTask);
    tasksQueryRepositoryMock.findAllTasks.mockResolvedValueOnce(fullGetTasks);

    const { tasks } = await tasksCondition.execute(falseTask.userId, 0);

    expect(tasksQueryRepositoryMock.create).toHaveBeenCalledTimes(4);
    expect(tasksQueryRepositoryMock.findByStatus).toHaveBeenCalledWith(falseTask.userId, false)
    expect(tasksQueryRepositoryMock.findByStatus).toHaveBeenCalledTimes(1);
    expect([...tasks]).toEqual([falseTask, falseTask, falseTask]);
    expect(await tasksQueryRepositoryMock.findByStatus()).toHaveLength(3);
    await expect(tasksQueryRepositoryMock.findAllTasks()).resolves.toHaveLength(4); 
  }) 
});
