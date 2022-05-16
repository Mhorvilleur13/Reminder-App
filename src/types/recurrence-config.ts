export interface RecurrenceConfig {
  recurrenceType: RecurrenceType;
  hours?: number[];
  days?: number[];
  months?: number[];
  years?: number[];
}

export enum RecurrenceType {
  ONCE = "ONCE",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY",
  CUSTOM = "CUSTOM",
}
