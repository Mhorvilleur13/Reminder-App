import React from "react";
import { Task } from "../../types/task";
import TaskComponent from "../task/task";
import { tasksAtom } from "../../state/atoms";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import "../../index.css";
import { CompleteTaskProp } from "../../App";

const AllTasks = ({ completeTask }: CompleteTaskProp) => {
  const tasks = useRecoilValue(tasksAtom);
  return (
    <div className="container">
      <h1 className="text-center mb-3">All Reminders</h1>
      {tasks.length === 0 ? (
        <div className="card mt-5 bg-light mx-auto card-class">
          <div className="card-header">
            <h2>No Reminders</h2>
          </div>
          <div className="card-body">
            <p>You have no reminders. To add a reminder, click below.</p>
            <Link to="/" className="btn btn-primary">
              {" "}
              Add Task
            </Link>
          </div>
        </div>
      ) : (
        tasks.map((task: Task) => {
          return <TaskComponent task={task} completeTask={completeTask} />;
        })
      )}
    </div>
  );
};

export default AllTasks;
