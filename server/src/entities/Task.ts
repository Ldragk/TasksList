import { randomUUID } from "node:crypto";
import { Replace } from "../helpers/Replace";
import { numberOfDaysInTheMonth } from "../use-cases/notifications-cases/functions/numberOfDaysInTheMonth";


interface TaskProps {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  done?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
}
export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(
    props: Replace<TaskProps, { done?: boolean; createdAt?: Date }>,
    id?: string
  ) {
    this.props = {
      ...props,
      done: props.done ?? false,
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  public set id(id: string) {
    this.id = id;
  }
  public get id(): string {
    return this._id;
  }

  public set title(title: string) {
    title.length >= 1 && title.length <= 30
      ? (this.props.title = title)
      : new Error("Title must be between 1 and 30 characters");
  }

  get title(): string {
    return this.props.title;
  }

  public set description(description: string) {
    description.length >= 1 && description.length <= 500
      ? (this.props.description = description)
      : new Error("Description must be between 1 and 500 characters");
  }
  public get description(): string {
    return this.props.description;
  }

  set limitDay(limitDay: number) {
    limitDay >= 1 &&
    limitDay <= numberOfDaysInTheMonth() &&
    String(limitDay).length <= 2 &&
    /^[\d,.?!]+$/.test(String(limitDay))
      ? (this.props.limitDay = limitDay)
      : new Error(
          "The limit day must be a number between 1 and the last day of the limit month"
        );
  }
  public get limitDay(): number {
    return this.props.limitDay;
  }

  public set limitMonth(limitMonth: number) {
    limitMonth >= 1 &&
    limitMonth <= 12 &&
    String(limitMonth).length <= 2 &&
    /^[\d,.?!]+$/.test(String(limitMonth))
      ? (this.props.limitMonth = limitMonth)
      : new Error("Limit month must be a number between 1 and 12");
  }
  public get limitMonth(): number {
    return this.props.limitMonth;
  }

  public set limitYear(limitYear: number) {
    limitYear >= new Date().getFullYear() &&
    String(limitYear).length <= 4 &&
    /^[\d,.?!]+$/.test(String(limitYear))
      ? (this.props.limitYear = limitYear)
      : new Error(
          "Limit year must be a number greater than or equal to the current year"
        );
  }
  public get limitYear(): number {
    return this.props.limitYear;
  }

  public set done(done: boolean | undefined) {
    this.props.done = done;
  }
  public get done(): boolean | undefined {
    return this.props.done;
  }

  public set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt;
  }
  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public updated() {
    this.props.updatedAt = new Date();
  }
  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
