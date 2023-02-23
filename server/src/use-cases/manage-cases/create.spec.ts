import { it, describe, expect } from "vitest";
import { Task } from "../../entities/Task";
import { InMemoryTaskRepository } from "../../repositories/in-memory-repository/in-memory-task-repository";
import { CreateTask } from "./Post-create";

describe("Create Task Use Case", () => {
  it("should be able to create a valid task", async () => {
    const inMemoryRepository = new InMemoryTaskRepository();
    const createTask = new CreateTask(inMemoryRepository);
    expect(
      createTask.execute({
        title: "title",
        content: "content",
        date: "02/23/2024",
        done: false,
      })
    ).resolves.toBeInstanceOf(Task);
  });
});
