import { randomUUID } from "node:crypto";
import { Replace } from "../helpers/Replace";

export interface TaskProps {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  date: string;
  done: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(
    props: Replace<TaskProps, { createdAt?: Date; updateAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.id;
  }

  public set title(title: string) {
    this.props.title = title;
  }
  get title(): string {
    return this.props.title;
  }

  public set description(description: string) {
    this.props.description = description;
  }
  public get description(): string {
    return this.props.description;
  }

  set limitDay(limitDay: number) {
    this.props.limitDay = limitDay;
  }
  public get limitDay(): number {
    return this.props.limitDay;
  }

  public set limitMonth(limitMonth: number) {
    this.props.limitMonth = limitMonth;
  }
  public get limitMonth(): number {
    return this.props.limitMonth;
  }

  public set limitYear(limitYear: number) {
    this.props.limitYear = limitYear;
  }
  public get limitYear() {
    return this.props.limitYear;
  }

  public set date(date: string) {
    this.props.date = date;
  }
  public get date() {
    return this.props.date;
  }

  public set done(done: boolean) {
    this.props.done = done;
  }
  public get done(): boolean {
    return this.props.done;
  }

  public set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt;
  }
  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt;
  }
  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public static create(props: TaskProps) {
    return new Task(props);
  }
}
