import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { missedTaskState, tasksAtom, todayTaskState } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";
import { CompleteTaskProp, RemoveTaskProp } from "../../App";
import TaskComponent from "../task/task";

const MissedTasks = (props: CompleteTaskProp & RemoveTaskProp) => {
  const { completeTask, removeTask } = props;
  const missedTasks = useRecoilValue(missedTaskState);

  return (
    <div className="pb-4">
      <h1 className="text-center page-title">Missed Tasks</h1>
      {missedTasks.length === 0 ? (
        <div className="card shadow-lg mb-5 bg-white rounded  mb-4 mx-auto card-class">
          <div className="card-header">
            <h2>No Missed Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no missed tasks.</p>
          </div>
        </div>
      ) : (
        missedTasks.map((task, index) => {
          return <TaskComponent task={task} index={index} completeTask={completeTask} removeTask={removeTask} />;
        })
      )}
    </div>
  );
};

export default MissedTasks;
