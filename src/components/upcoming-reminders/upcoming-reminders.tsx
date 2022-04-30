import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tasksAtom, upcomingTasksState } from "../../state/atoms";
import "../../index.css";

const UpcomingReminders = () => {
  const upcoming = useRecoilValue(upcomingTasksState);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div>
      <h1 className="text-center mb-3">Upcoming Reminders</h1>
      {upcoming.length === 0 ? (
        <div className="card mt-5 bg-light mx-auto card-class">
          <div className="card-header">
            <h2>No Upcoming Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no tasks in the next 7 days. Relax!</p>
          </div>
        </div>
      ) : (
        upcoming.map((task, index) => {
          return (
            <div className="card bg-light mx-auto  mb-4 card-class">
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

export default UpcomingReminders;
