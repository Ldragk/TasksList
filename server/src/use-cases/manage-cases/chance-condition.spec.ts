import { it, describe, expect } from "vitest";
import { InMemoryTaskRepository } from "../../repositories/in-memory-repository/in-memory-task-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { TaskStatus } from "./Chance-condition";

describe("Change condition Task Use Case", () => {
  it("should be able to change condition task", async () => {
    const tasksRepository = new InMemoryTaskRepository();
    const taskStatus = new TaskStatus(tasksRepository);
    const task = MakeTask();
    await tasksRepository.saveCondition(task);
    await taskStatus.execute(task.id);
  });
});
