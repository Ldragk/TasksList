
export interface NotificationProps {
  title: string;
  date: string;
}
export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: NotificationProps, id: string) {
    this._id = id;
    this.props = {
      ...props,
    };
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id() {
    return this._id;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  get title() {
    return this.props.title;
  }

  public set date(date: string) {
    this.props.date = date;
  }
  
  get date() {
    return this.props.date;
  }

  public static create(props: NotificationProps, id: string) {
    return new Notification(props, id);
  }
}
