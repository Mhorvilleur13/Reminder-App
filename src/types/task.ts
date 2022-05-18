import { RecurrenceConfig } from "./recurrence-config";
import { ReminderConfig } from "./reminder-config";
import { Tag } from "./tag";

export interface Task {
  taskName: string;
  taskID: string;
  reminderDate: string;
  reminderTime: string;
  tags: Tag[];
  recurring: boolean;
  recurrenceConfig: RecurrenceConfig;
  reminderConfig: ReminderConfig;
}

export interface Tasks {
  tasks: Task[];
}
