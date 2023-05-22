import { describe, it, expect, vi } from "vitest";
import { InMemoryQueryRepository } from "../../../repositories/in-memory-repository/in-memory-query-repository";
import { MakeTask } from "../../../test/factories/task-factory";
import { TasksCondition } from "../get-status";

describe("get by task status", () => {
  it("should return all tasks in a parameter true or false", async () => {
    const tasksRepository = new InMemoryQueryRepository();
    const tasksCondition = new TasksCondition(tasksRepository);

    let trueTask = MakeTask({ done: true });
    let falseTask = MakeTask();

    const called = vi.spyOn(tasksRepository, "create");

    await tasksRepository.create(trueTask);
    await tasksRepository.create(trueTask);
    await tasksRepository.create(falseTask);

    const { tasks } = await tasksCondition.execute(1);

    expect(tasksRepository.tasks[0].date.value).toEqual(trueTask.date.value);
    expect(tasksCondition.execute(1)).toEqual(Promise.resolve([trueTask]));
    expect(called).toHaveBeenCalledTimes(3);
    expect(tasksRepository.tasks).toHaveLength(3);
    expect(tasks).toHaveLength(2);
  });
});
