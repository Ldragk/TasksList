import { expect } from "vitest";
import { it, describe } from "vitest";
import { currentYear } from "../task-entities/__test__/limitDate.spec";
import { Trash } from "../trash";

describe("task", () => {
  it("should be able to create a valid task", () => {
    expect(
      () =>
        new Trash(
          {
            title: "title",
            content: "content",
            date: `05/20/${currentYear}`,
            done: true,
            createdAt: new Date(),
            deletedAt: new Date(Date.now() + 1),
          },
          "4200d8e7-61a3-4010-ada4-893090235710"
        )
    ).toBeTruthy();
  });

  it("should be able to create a invalid task", () => {
    expect(
      () =>
        new Trash(
          {
            title: "",
            content: "cent",
            date: `02/29/${2022}`,
            done: undefined,
            createdAt: new Date(),
            deletedAt: new Date(),
          },
            "asdas1231" 
        )
    ).toThrowError();
  });
});
