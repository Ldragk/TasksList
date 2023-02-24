import { it, describe, expect } from "vitest";
import { LimitDate } from "./LimitDate";

export const currentYear = new Date().getFullYear();

describe("Task limit date", () => {
  it("should be able to create a valid task limit date", () => {
    expect(() => new LimitDate(`05/20/${currentYear}`)).toBeTruthy();
  });

  it("should be able to create a invalid task limit date", () => {
    expect(() => new LimitDate("12122021")).toThrowError();
  });

  it("should be able to create a invalid task limit date", () => {
    expect(() => new LimitDate("12-22-2021")).toThrowError();
  });

  it("should be able to create a invalid task limit date", () => {
    expect(() => new LimitDate("12 22 2021")).toThrowError();
  });

  it("should not be able to create a task limit date with invalid year format", () => {
    expect(() => new LimitDate("12/12/202")).toThrowError();
  });

  it("should not be able to create a task limit date with invalid year value", () => {
    expect(() => new LimitDate(`02/20/${currentYear - 1}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid year format and value", () => {
    expect(() => new LimitDate("12/12/20230")).toThrowError();
  });

  it("should not be able to create a task limit date with invalid year format and value", () => {
    expect(() => new LimitDate("12/12/")).toThrowError();
  });

  it("should not be able to create a task limit date with invalid month format", () => {
    expect(() => new LimitDate(`132/20/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid month value", () => {
    expect(() => new LimitDate(`0/20/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid month value", () => {
    expect(() => new LimitDate(`13/20/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid month format and value", () => {
    expect(() => new LimitDate(`/20/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid day format", () => {
    expect(() => new LimitDate(`11/200/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid day value", () => {
    expect(() => new LimitDate(`11/31/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid day value", () => {
    expect(() => new LimitDate(`02/29/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid day value", () => {
    expect(() => new LimitDate(`11/0/${currentYear}`)).toThrowError();
  });

  it("should not be able to create a task limit date with invalid day format and value", () => {
    expect(() => new LimitDate(`11//${currentYear}`)).toThrowError();
  });
});
