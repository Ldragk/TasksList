import { InMemoryManageRepository } from "@src/repositories/in-memory-repository/in-memory-manage-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { TaskStatus } from "../chance-condition";

describe("Change condition Task Use Case", () => {
  it("should be able to change condition task", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const task = MakeTask();
    const taskStatus = new TaskStatus(tasksRepository);
    await tasksRepository.create(task);
    await taskStatus.execute(tasksRepository.tasks[0].id, task.userId);

    expect(tasksRepository.tasks[0].done).toBe(true);
  });

  it("should not be able to updated a non existing tasks", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const taskStatus = new TaskStatus(tasksRepository);

    expect(async () => {
      return await taskStatus.execute("fake-notification-id", "fake-user-id");
    }).rejects.toThrowError();
  });
});
