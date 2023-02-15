import { randomUUID } from "node:crypto";

export interface NotificationProps {
  title: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
}
export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
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

  set limitDay(limitDay: number) {
    this.props.limitDay = limitDay;
  }
  public get limitDay() {
    return this.props.limitDay;
  }

  public set limitMonth(limitMonth: number) {
    this.props.limitMonth = limitMonth;
  }
  public get limitMonth() {
    return this.props.limitMonth;
  }

  public set limitYear(limitYear: number) {
    this.props.limitYear = limitYear;
  }
  public get limitYear() {
    return this.props.limitYear;
  }

  public static create(props: NotificationProps, id?: string) {
    return new Notification(props, id);
  }
}
