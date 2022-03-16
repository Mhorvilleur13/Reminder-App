import React from "react";
import { RecurrenceType } from "../../types/recurrence-config";
import { ReminderType } from "../../types/reminder-config";
import { Task, Tasks } from "../../types/task";
import { Tag } from "../../types/tag";

interface TaskComponentProps {
  task: Task;
  london: string;
}

const TaskComponent = ({
  task: {
    taskName,
    reminderConfig: { customMessage },
  },
}: TaskComponentProps) => {
  return (
    <div>
      <h1>{taskName}</h1>
      <p>{customMessage}</p>
    </div>
  );
};
export default TaskComponent;
