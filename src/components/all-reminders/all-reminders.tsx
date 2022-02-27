import React from "react";
import { RecurrenceType } from "../../types/recurrence-config";
import { ReminderType } from "../../types/reminder-config";
import { Task, Tasks } from '../../types/task';
import { Tag } from '../../types/tag';

const dummyReminders: Task[] = [{
  taskName: 'Annoy Felix',
  reminderDate: 'today',
  tags: [{
    tagName: 'felixtag',
    tagCode: '123',
    fontColor: 'red',
    backgroundColor: 'black'
  }],
  recurring: false,
  recurrenceConfig: {
    recurrenceType: RecurrenceType.ONCE,
  },
  reminderConfig: {
    customMessage: 'annoy felix all the time',
    remindBeforeMs: 2,
    reminderTypes: [ReminderType.SMS]
  }
}]
const AllReminders = () => {
  return (
    <h1>{dummyReminders[0].taskName}</h1>
  );
};

export default AllReminders;
