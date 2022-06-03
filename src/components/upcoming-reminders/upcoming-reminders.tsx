import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { missedTaskState, tasksAtom, upcomingTasksState } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";
import { CompleteTaskProp, RemoveTaskProp } from "../../App";
import TaskComponent from "../task/task";

const UpcomingReminders = (props: CompleteTaskProp & RemoveTaskProp) => {
  const { completeTask, removeTask } = props;
  const upcoming = useRecoilValue(upcomingTasksState);
  return (
    <div className="pb-4">
      <h1 className="text-center mb-3 page-title">Upcoming Reminders</h1>
      {upcoming.length === 0 ? (
        <div className="card shadow-lg mb-5 bg-white rounded  mb-4 mx-auto card-class">
          <div className="card-header">
            <h2>No Upcoming Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no tasks in the next 7 days. Relax!</p>
          </div>
        </div>
      ) : (
        upcoming.map((task, index) => {
          return <TaskComponent task={task} index={index} completeTask={completeTask} removeTask={removeTask} />;
        })
      )}
    </div>
  );
};

export default UpcomingReminders;
