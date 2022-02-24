export interface RecurrenceConfig {
  recurrenceType: RecurrenceType;
  hours?: number[];
  days?: number[];
  months?: number[];
  years?: number[];
}

export enum RecurrenceType {
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ANUALLY = "ANUALLY",
  CUSTOM = "CUSTOM",
}
