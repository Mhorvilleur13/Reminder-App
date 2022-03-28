import dayjs from "dayjs";
import React, { useState } from "react";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { tasksAtom, upcomingTasksState } from "../../state/atoms";
import { Task } from "../../types/task";

const UpcomingReminders = (index: any) => {
  const upcoming = useRecoilValue(upcomingTasksState);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const removeTask = (index: any) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div>
      {upcoming.map((task) => {
        return (
          <div className="card bg-light mb-4" style={{ width: "18rem" }}>
            <div className="card-header">
              <h2>{task.taskName}</h2>
            </div>
            <div className="card-body">
              <p>{task.reminderConfig.customMessage}</p>
              <p>
                <b>Reminder Date:</b> {task.reminderDate}
              </p>
              <button onClick={() => removeTask(index)}>Delete Task</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingReminders;
