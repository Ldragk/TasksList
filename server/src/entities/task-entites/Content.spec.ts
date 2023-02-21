import { expect } from "vitest";
import { it, describe } from "vitest";

import { Content } from "./Content";

describe("Task content", () => {
  it("should be able to create a task content", () => {
    const content = new Content("Você recebeu uma solicitação de amizade");
    expect(content).toBeTruthy();
  });

  it("should not be able to create a task content with less than 5 caracteres", () => {
    expect(() => new Content("aaa")).toThrow();
  });

  it("should not be able to create a task content with more than 250 caracteres", () => {
    expect(() => new Content("a".repeat(251))).toThrow();
  });
});
