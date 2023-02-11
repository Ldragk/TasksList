import { randomUUID } from "node:crypto";
import { Replace } from "../helpers/Replace";

export interface TaskProps {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  date?: string | null;
  done?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
}
export class Task {
  [x: string]: number;
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
  public get date(): string {
    return (this.date = `${this.limitDay}/${this.limitMonth}/${this.limitYear}`);
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
