export interface TrashProps {
  title: string;
  content: string;
  date: string;
  done?: boolean;
  createdAt?: Date;
  deletedAt?: Date | null | undefined;
  userId: string
}

export class Trash {
  private _id: string;
  private props: TrashProps;

  constructor(props: TrashProps, id: string) {
    if (id.length !== 24) throw new Error('Id must be a valid ObjectID');
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

  public set content(content: string) {
    this.props.content = content;
  }

  public get content(): string {
    return this.props.content;
  }

  public set date(date: string) {
    this.props.date = date;
  }

  public get date(): string {
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

  deleted() {
    return (this.props.deletedAt = new Date());
  }

  public set deletedAt(deletedAt: Date | null | undefined) {
    this.props.deletedAt = deletedAt;
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }
}
