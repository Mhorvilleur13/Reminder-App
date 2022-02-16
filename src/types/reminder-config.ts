export interface ReminderConfig {
  customMessage: string;
  remindBeforeMs?: number;
  reminderTypes: ReminderType[];
}

export enum ReminderType {
  SMS = "SMS",
  EMAIL = "EMAIL",
  IN_APP = "IN_APP",
}
