import React, { useState } from "react";
import { RecurrenceType } from "../../types/recurrence-config";
import { ReminderType } from "../../types/reminder-config";
import { Task } from "../../types/task";
import { Tag } from "../../types/tag";
import TaskComponent from "../task/task";
import { tasksAtom } from "../../state/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

export interface removeTaskProp {
  removeTask(index: string): void;
}

const AllTasks = () => {
  const tasks = useRecoilValue(tasksAtom);
  return (
    <div className="container">
      <h1 className="text-center mb-3">All Reminders</h1>
      {tasks.map((task: Task, index: any, removeTask) => {
        return <TaskComponent task={task} london={"paris"} />;
      })}
    </div>
  );
};

export default AllTasks;
