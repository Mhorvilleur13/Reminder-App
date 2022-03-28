import React from "react";
import { RecurrenceType } from "../../types/recurrence-config";
import { ReminderType } from "../../types/reminder-config";
import { Task, Tasks } from "../../types/task";
import { Tag } from "../../types/tag";
import { removeTaskProp } from "../all-tasks/all-tasks";
import { useRecoilState } from "recoil";
import { tasksAtom } from "../../state/atoms";

interface TaskComponentProps {
  task: Task;
  london: string;
}

const TaskComponent = (
  {
    task: {
      taskName,
      reminderConfig: { customMessage },
      reminderDate,
    },
  }: TaskComponentProps,
  index: any
) => {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const removeTask = (index: any) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
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
        <button onClick={() => removeTask(index)}>Delete Task</button>
      </div>
    </div>
  );
};

export default TaskComponent;
