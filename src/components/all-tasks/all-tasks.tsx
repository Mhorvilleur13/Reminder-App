import React from "react";
import { Task } from "../../types/task";
import TaskComponent from "../task/task";
import { tasksAtom } from "../../state/atoms";
import { useRecoilValue } from "recoil";
import { Link, useLocation } from "react-router-dom";
import "../../index.css";
import { CompleteTaskProp, RemoveTaskProp } from "../../App";

const AllTasks = (props: CompleteTaskProp & RemoveTaskProp) => {
  const { completeTask, removeTask } = props;
  const tasks = useRecoilValue(tasksAtom);
  return (
    <div className="container pb-4">
      <h1 className="text-center mb-3 page-title">All Reminders</h1>
      {tasks.length === 0 ? (
        <div className="card shadow-lg mb-5 bg-white rounded  mb-4 mx-auto card-class">
          <div className="card-header">
            <h2>No Reminders</h2>
          </div>
          <div className="card-body">
            <p>You have no reminders. To add a reminder, click below.</p>
            <Link to="/add" className="btn btn-primary">
              {" "}
              Add Task
            </Link>
          </div>
        </div>
      ) : (
        tasks.map((task: Task, index: number) => {
          return <TaskComponent task={task} index={index} completeTask={completeTask} removeTask={removeTask} />;
        })
      )}
    </div>
  );
};

export default AllTasks;
