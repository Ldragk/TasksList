import { expect } from "vitest";
import { Task } from "./Task";
import { Description } from "./task-entites/Content";
import { it, describe } from "vitest";

describe("task", () => {
  it("should be able to create a valid task", () => {
    expect(
      () =>
        new Task({
          title: "Task 1",
          description: new Description("Description of task 1"),
          limitDay: 1,
          limitMonth: 12,
          limitYear: 2023,
          done: true,
          createdAt: new Date(),
          updatedAt: undefined,
        })
    ).toBeTruthy();
  });


  it("should be able to create a invalid task", () => {
    expect(
      () =>
        new Task({
          title: "",
          description: new Description(""),
          limitDay: 111 || 0,
          limitMonth: 13 || 0,
          limitYear: 2022 || 202,
          createdAt: new Date(Date.now() - 1),
          updatedAt: new Date(),
        })
    ).toThrow();;
  });
});
