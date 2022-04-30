import React from "react";
import { Task } from "../../types/task";
import { useRecoilState } from "recoil";
import { tasksAtom } from "../../state/atoms";
import "../../index.css";

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
      reminderTime,
    },
  }: TaskComponentProps,
  index: number
) => {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="card bg-light mb-4 mx-auto card-class">
      <div className="card-header">
        <h2>{taskName}</h2>
      </div>
      <div className="card-body">
        <p>{customMessage}</p>
        <p>
          <b>Reminder Date:</b> {reminderDate}
        </p>
        <p>
          <b>Reminder Time:</b> {reminderTime}
        </p>
        <button onClick={() => removeTask(index)}>Delete Task</button>
      </div>
    </div>
  );
};

export default TaskComponent;
