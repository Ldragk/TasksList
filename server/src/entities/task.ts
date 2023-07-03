import { ObjectId } from 'bson';
import { LimitDate } from './task-entities/limitDate';

export interface TaskProps {
  title: string;
  content: string;
  date: LimitDate;
  done?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
  userId: string;
}
export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(props: TaskProps, id?: string) {
    if (props.title.length < 1 || props.title.length > 30) {
      throw new Error('Title must be between 1 and 30 characters');
    }
    if (props.content.length < 5 || props.content.length > 250) {
      throw new Error('Content must be between 5 and 250 characters');
    }

    this.props = {
      ...props,
      done: props.done ?? false,
      createdAt: props.createdAt ?? new Date(new Date().setSeconds(0, 0)),
    };
    this._id = id ?? String(new ObjectId());
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

  public set content(content: string) {
    this.props.content = content;
  }

  public get content(): string {
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public updated() {
    this.props.updatedAt = new Date(new Date().setSeconds(0, 0));
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }
}
