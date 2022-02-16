import { ITask } from "./task";

export interface Reminder {
  text: string;
  time: Date;
  reminderType: ReminderType;
}

export enum ReminderType {
  SMS = "SMS",
  EMAIL = "EMAIL",
}
