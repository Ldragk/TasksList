import { Notification } from "../../entities/Notification";

export class NotificationViewModel {
  static toHTTP(task: Notification) {
    return {      
      title: task.title,      
      limitDay: task.limitDay,
      limitMonth: task.limitMonth,
      limitYear: task.limitYear,        
    };
  }
}
