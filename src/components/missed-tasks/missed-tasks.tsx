import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { missedTaskState, tasksAtom, todayTaskState } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";
import { RemoveTaskProp } from "../../App";

const MissedTasks = ({ removeTask }: RemoveTaskProp) => {
  const missedTasks = useRecoilValue(missedTaskState);

  return (
    <div>
      <h1 className="text-center">Missed Tasks</h1>
      {missedTasks.length === 0 ? (
        <div className="card mt-5 bg-light mx-auto card-class">
          <div className="card-header">
            <h2>No Missed Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no misses tasks. Chill out</p>
          </div>
        </div>
      ) : (
        missedTasks.map((task, index) => {
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

export default MissedTasks;
