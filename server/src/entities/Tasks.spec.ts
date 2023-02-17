import { expect, test } from "vitest";
import { Task } from "./Task";
import { Description } from "./task-entites/Description";

test("create an Task", () => {
  const task = new Task({
    title: "Task 1",
    description: new Description("Description of task 1"),
    limitDay: 1,
    limitMonth: 12,
    limitYear: 2023,
    done: false,
    createdAt: new Date(),
    updatedAt: undefined,
  });

  expect(task).toBeInstanceOf(Task);
});
