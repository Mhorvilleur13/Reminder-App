import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { missedTaskState, tasksAtom, todayTaskState } from "../../state/atoms";
import "../../index.css";

const MissedTasks = () => {
  const missedTasks = useRecoilValue(missedTaskState);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
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
                <p>{task.reminderConfig.customMessage}</p>
                <p>
                  <b>Reminder Date:</b> {task.reminderDate}
                </p>
                <p>
                  <b>Reminder Time:</b> {task.reminderTime}
                </p>
                <button onClick={() => removeTask(index)}>Delete Task</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MissedTasks;
