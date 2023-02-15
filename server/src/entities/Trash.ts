interface TrashProps {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  done?: boolean;
  createdAt?: Date;
  deletedAt?: Date | null | undefined;
}

export class Trash {
  private _id: string;

  private props: TrashProps;

  constructor(props: TrashProps, id: string) {
    this.props = { ...props, deletedAt: undefined };
    this._id = id;
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

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
}
