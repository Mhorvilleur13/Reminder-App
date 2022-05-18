import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tasksAtom, todayTaskState } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";
import { CompleteTaskProp, RemoveTaskProp } from "../../App";

const TodaysReminders = (props: CompleteTaskProp & RemoveTaskProp) => {
  const { completeTask, removeTask } = props;
  const todayReminders = useRecoilValue(todayTaskState);
  return (
    <div>
      <h1 className="text-center">Todays Reminders</h1>
      {todayReminders.length === 0 ? (
        <div className="card mt-5 bg-light mx-auto card-class">
          <div className="card-header">
            <h2>No Tasks Today</h2>
          </div>
          <div className="card-body">
            <p>You have no tasks today. Sit back and chill</p>
          </div>
        </div>
      ) : (
        todayReminders.map((task, index) => {
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
                <button className="mt-2" onClick={() => completeTask(index)}>
                  {" "}
                  Task Completed
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodaysReminders;
