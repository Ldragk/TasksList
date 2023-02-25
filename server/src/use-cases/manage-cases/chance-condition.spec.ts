import { it, describe, expect } from "vitest";
import { InMemoryManageRepository } from "../../repositories/in-memory-repository/in-memory-manage-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { TaskStatus } from "./Chance-condition";

describe("Change condition Task Use Case", () => {
  it("should be able to change condition task", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const task = MakeTask();
    const taskStatus = new TaskStatus(tasksRepository);
    await tasksRepository.create(task);
    await taskStatus.execute(tasksRepository.tasks[0].id);

    expect(tasksRepository.tasks[0].done).toBe(true);
  });

  it("should not be able to updated a non existing tasks", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const taskStatus = new TaskStatus(tasksRepository);

    expect(async () => {
      return await taskStatus.execute("fake-notification-id");
    }).rejects.toThrowError();
  });
});
