import dayjs from "dayjs";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CompleteTaskProp } from "../../App";
import { recurringTaskState, tasksAtom } from "../../state/atoms";

const Recurring = ({ completeTask }: CompleteTaskProp) => {
  const recurringTasks = useRecoilValue(recurringTaskState);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div>
      <h1 className="text-center"> Recurring Tasks</h1>
      {recurringTasks.length === 0 ? (
        <div className="card mt-5 bg-light mx-auto card-class">
          <div className="card-header">
            <h2>No Recurring Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no recurring tasks. Chill out</p>
          </div>
        </div>
      ) : (
        recurringTasks.map((task, index) => {
          return (
            <div className="card bg-light mx-auto mb-4 card-class">
              <div className="card-header">
                <h2>{task.taskName}</h2>
              </div>
              <div className="card-body">
                <h5 className="card-title">{task.reminderConfig.customMessage}</h5>
                <p>
                  <b> Date:</b> {dayjs(task.reminderDate).format("dddd, MMM D, YYYY")}
                </p>
                <p>
                  <b>Time:</b> {task.reminderTime}
                </p>
                <button onClick={() => removeTask(index)}>Delete Task</button>
                <button onClick={() => completeTask(index)}>Task Completed</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Recurring;
