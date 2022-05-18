import React from "react";
import { Task } from "../../types/task";
import { useRecoilState } from "recoil";
import { completedTaskAtom, tasksAtom } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";

interface TaskComponentProps {
  task: Task;
  completeTask: (index: number) => void;
  removeTask: (id: string) => void;
}

const TaskComponent = (
  {
    task: {
      taskName,
      taskID,
      reminderConfig: { customMessage },
      reminderDate,
      reminderTime,
    },
    completeTask,
    removeTask,
  }: TaskComponentProps,
  index: number
) => {
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
        <button onClick={() => removeTask(taskID)}>Delete Task</button>
        <button className="mt-2" onClick={() => completeTask(index)}>
          {" "}
          Task Complete
        </button>
      </div>
    </div>
  );
};

export default TaskComponent;
