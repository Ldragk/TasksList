import { it, describe, expect } from "vitest";
import { Content } from "../../entities/task-entities/Content";
import { InMemoryManageRepository } from "../../repositories/in-memory-repository/in-memory-manage-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { FullUpdate } from "./Update";

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
    await update.execute(tasksRepository.tasks[0].id, taskUpdate);
    expect(tasksRepository.tasks[0].title).toEqual(taskUpdate.title);
    expect(tasksRepository.tasks[0].content.value).toEqual(taskUpdate.content);
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
      return await update.execute("fake-notification-id", taskUpdate);
    }).rejects.toThrowError();
  });
});
