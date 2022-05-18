import dayjs from "dayjs";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { RemoveTaskProp } from "../../App";
import { completedTaskAtom, tasksAtom } from "../../state/atoms";

const CompletedTasks = ({ removeTask }: RemoveTaskProp) => {
  const completedTasks = useRecoilValue(completedTaskAtom);
  return (
    <div>
      <h1 className="text-center">Completed Tasks</h1>
      {completedTasks.length === 0 ? (
        <div className="card mt-5 bg-light mx-auto card-class">
          <div className="card-header">
            <h2>No Completed Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no completed tasks. Chill out</p>
          </div>
        </div>
      ) : (
        completedTasks.map((task, index) => {
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
                <button onClick={() => removeTask(task.taskID)}>Delete Task</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CompletedTasks;
