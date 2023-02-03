import { Replace } from "../helpers/Replace";

export interface NotificationProps {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  date: string;
}

export class Notification {
  constructor(
    private props: Replace<NotificationProps, { createdAt?: Date }> 
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }
}
