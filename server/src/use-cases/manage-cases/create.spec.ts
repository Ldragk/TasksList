import { it, describe, expect } from "vitest";
import { Task } from "../../entities/Task";
import { InMemoryTaskRepository } from "../../repositories/in-memory-repository/in-memory-task-repository";
import { CreateTask } from "./Create";

describe("Create Task Use Case", () => {
  it("should be able to create a valid task", async () => {
    const tasksRepository = new InMemoryTaskRepository();
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
