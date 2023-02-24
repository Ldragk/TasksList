import { it, describe, expect } from "vitest";
import { Task } from "../../entities/Task";
import { InMemoryManageRepository } from "../../repositories/in-memory-repository/in-memory-manage-repository";
import { CreateTask } from "./Create";

describe("Create Task Use Case", () => {
  it("should be able to create a valid task", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);
    const { task } = await createTask.execute({
      title: "title",
      content: "content",
      date: "02/23/2024",
      done: false,
    });
    expect(tasksRepository.tasks).toHaveLength(1);
    expect(tasksRepository.tasks[0]).toEqual(task);
    expect(tasksRepository.tasks[0]).toBeInstanceOf(Task);
  });
});
