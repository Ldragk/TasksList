import { InMemoryManageRepository } from "@src/repositories/in-memory-repository/in-memory-manage-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { FullUpdate } from "../update";

describe("update", () => {
  it("should update a case", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const update = new FullUpdate(tasksRepository);
    const task = MakeTask();
    await tasksRepository.create(task);
    const taskUpdate = {
      title: "new title",
      content: "new content",
      date: "3/25/2025",
      done: true,
    };

    const id = tasksRepository.tasks[0].id
    const userId = tasksRepository.tasks[0].userId

    await update.execute(id, userId, taskUpdate);
    expect(tasksRepository.tasks[0].title).toEqual(taskUpdate.title);
    expect(tasksRepository.tasks[0].content).toEqual(taskUpdate.content);
    expect(tasksRepository.tasks[0].date.value).toEqual(taskUpdate.date);
    expect(tasksRepository.tasks[0].done).toEqual(taskUpdate.done);
  });

  it("should not be able to updated a non existing tasks", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const update = new FullUpdate(tasksRepository);

    const taskUpdate = {
      title: "new title",
      content: "new content",
      date: "3/25/2025",
      done: true,
    };

    expect(async () => {
      return await update.execute("fake-notification-id", "fake-notification-userId", taskUpdate);
    }).rejects.toThrowError(); 
  });
}); 
