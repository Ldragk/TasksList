import { randomUUID } from "node:crypto";
import { Replace } from "../helpers/Replace";
import { Description } from "./task-entites/Description";
import { LimitDay } from "./task-entites/LimiteDay";
import { LimitMonth } from "./task-entites/LimiteMonth";
import { LimitYear } from "./task-entites/LimitYear";
import { Title } from "./task-entites/Title";

interface TaskProps {
  title: Title;
  description: Description;
  limitDay: LimitDay;
  limitMonth: LimitMonth;
  limitYear: LimitYear;
  date?: string | null;
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

  public set title(title: Title) {
    this.props.title = title;
  }

  get title(): Title {
    return this.props.title;
  }

  public set description(description: Description) {
    this.props.description = description;
  }
  public get description(): Description {
    return this.props.description;
  }

  set limitDay(limitDay: LimitDay) {
    this.props.limitDay = limitDay;
  }
  public get limitDay(): LimitDay {
    return this.props.limitDay;
  }

  public set limitMonth(limitMonth: LimitMonth) {
    this.props.limitMonth = limitMonth;
  }
  public get limitMonth(): LimitMonth {
    return this.props.limitMonth;
  }

  public set limitYear(limitYear: LimitYear) {
    this.props.limitYear = limitYear;
  }
  public get limitYear(): LimitYear {
    return this.props.limitYear;
  }

  public set date(date: string) {
    this.props.date = date;
  }
  public get date(): string {
    return (this.date = `${this.limitDay.value}/${this.limitMonth.value}/${this.limitYear.value}`);
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
