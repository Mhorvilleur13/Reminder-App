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
    reminderDate,
  },
}: TaskComponentProps) => {
  return (
    <div className="card bg-light mb-4" style={{ width: "18rem" }}>
      <div className="card-header">
        <h2>{taskName}</h2>
      </div>
      <div className="card-body">
        <p>{customMessage}</p>
        <p>
          <b>Reminder Date:</b> {reminderDate}
        </p>
      </div>
    </div>
  );
};
export default TaskComponent;
