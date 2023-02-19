import { expect } from "vitest";
import { it, describe } from "vitest";

import { Content } from "./Content";

describe("Notification content", () => {
  it("should be able to create a task description", () => {
    const content = new Content("Você recebeu uma solicitação de amizade");

    expect(content).toBeTruthy();
  });

  it("should not be able to create a notification content with less than 5 caracteres", () => {
    expect(() => new Content("aaa")).toThrow();
  });

  it("should not be able to create a notification content with more than 255 caracteres", () => {
    expect(() => new Content("a".repeat(256))).toThrow();
  });
});
