import React from "react";
import { Task } from "../../types/task";
import { useRecoilState } from "recoil";
import { completedTaskAtom, tasksAtom } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";

interface TaskComponentProps {
  task: Task;
  completeTask: (index: number) => void;
}

const TaskComponent = (
  {
    task: {
      taskName,
      reminderConfig: { customMessage },
      reminderDate,
      reminderTime,
    },
    completeTask,
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
    <div className="card  mb-4 mx-auto card-class">
      <div className="card-header">
        <h2>{taskName}</h2>
      </div>
      <div className="card-body">
        <h5 className="card-title">{customMessage}</h5>
        <p>
          <b> Date:</b> {dayjs(reminderDate).format("dddd, MMM D, YYYY")}
        </p>
        <p>
          <b> Time:</b> {reminderTime}
        </p>
        <button onClick={() => removeTask(index)}>Delete Task</button>
        <button onClick={() => completeTask(index)}></button>
      </div>
    </div>
  );
};

export default TaskComponent;
