import { RecurrenceConfig } from "./recurrence-config";
import { ReminderConfig } from "./reminder-config";
import { Tag } from "./tag";

export interface Task {
  taskName: string;
  reminderDate: string;
  tags: Tag[];
  recurring: boolean;
  recurrenceConfig: RecurrenceConfig;
  reminderConfig: ReminderConfig;
}
