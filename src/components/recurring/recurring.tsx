import dayjs from "dayjs";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CompleteTaskProp, RemoveTaskProp } from "../../App";
import { recurringTaskState, tasksAtom } from "../../state/atoms";
import TaskComponent from "../task/task";

const Recurring = (props: CompleteTaskProp & RemoveTaskProp) => {
  const { completeTask, removeTask } = props;
  const recurringTasks = useRecoilValue(recurringTaskState);
  return (
    <div className="pb-4">
      <h1 className="text-center page-title"> Recurring Tasks</h1>
      {recurringTasks.length === 0 ? (
        <div className="card shadow-lg mb-5 bg-white rounded  mb-4 mx-auto card-class">
          <div className="card-header">
            <h2>No Recurring Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no recurring tasks.</p>
          </div>
        </div>
      ) : (
        recurringTasks.map((task, index) => {
          return <TaskComponent task={task} index={index} completeTask={completeTask} removeTask={removeTask} />;
        })
      )}
    </div>
  );
};

export default Recurring;
