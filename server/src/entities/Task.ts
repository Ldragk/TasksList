import { randomUUID } from "node:crypto";
import { Replace } from "../helpers/Replace";
import { numberOfDaysInTheMonth } from "../use-cases/notifications-cases/functions/numberOfDaysInTheMonth";
import { Content } from "./task-entites/Content";
import { LimitDate } from "./task-entites/LimitDate";

interface TaskProps {
  title: string;
  content: Content;
  date: LimitDate;
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

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set date(date: LimitDate) {
    this.props.date = date;
  }

  public get date(): LimitDate {
    return this.props.date;
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
