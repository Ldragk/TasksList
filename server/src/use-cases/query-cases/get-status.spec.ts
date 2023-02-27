import { describe, it, expect, vi } from "vitest";
import { LimitDate } from "../../entities/task-entities/LimitDate";
import { InMemoryFindRepository } from "../../repositories/in-memory-repository/in-memory-find-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { QueryByMonth } from "./Get-month";
import { TasksCondition } from "./Get-status";

describe("get by month", () => {
  it("should return all tasks in a month", async () => {
    const tasksRepository = new InMemoryFindRepository();
    const tasksCondition = new TasksCondition(tasksRepository);

    let trueTask = MakeTask({done: true});    
    let falseTask = MakeTask();    

    const called = vi.spyOn(tasksRepository, "create");

    await tasksRepository.create(trueTask);
    await tasksRepository.create(trueTask);
    await tasksRepository.create(falseTask);
   

    const { tasks } = await tasksCondition.execute(1);

    expect(tasksRepository.tasks[0].date.value).toEqual(trueTask.date.value);
    expect(
      tasksCondition.execute(1)
    ).toEqual(Promise.resolve([trueTask]));
    expect(called).toHaveBeenCalledTimes(3);
    expect(tasksRepository.tasks).toHaveLength(3);
    expect(tasks).toHaveLength(2);
  });
});
