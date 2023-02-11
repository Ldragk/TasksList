interface TrashProps {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  date?: string | null;
  done?: boolean;
  createdAt?: Date;
  deletedAt?: Date | null;
}

export class Trash {
  private props: TrashProps;
  private _id: string;

  constructor(props: TrashProps, id: string) {
    this.props = props;
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

  public set deletedAt(deletedAt: Date | null | undefined) {
    this.props.deletedAt = deletedAt;
  }
  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
}
