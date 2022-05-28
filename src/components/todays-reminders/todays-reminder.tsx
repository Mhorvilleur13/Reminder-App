import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tasksAtom, todayTaskState } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";
import { CompleteTaskProp, RemoveTaskProp } from "../../App";
import TaskComponent from "../task/task";
import { Task } from "../../types/task";

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
        todayReminders.map((task: Task, index) => {
          return <TaskComponent task={task} index={index} completeTask={completeTask} removeTask={removeTask} />;
        })
      )}
    </div>
  );
};

export default TodaysReminders;
