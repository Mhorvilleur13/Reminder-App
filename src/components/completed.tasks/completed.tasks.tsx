import dayjs from "dayjs";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { RemoveCompletedTaskProp, RemoveTaskProp } from "../../App";
import { completedTaskAtom, tasksAtom } from "../../state/atoms";
import clock from "../../assets/images/back-in-time.png";
import bin from "../../assets/images/delete-16.png";
import check from "../../assets/images/checkmark-16.png";
import calendar from "../../assets/images/calendar.png";

const CompletedTasks = ({ removeCompletedTask }: RemoveCompletedTaskProp) => {
  const completedTasks = useRecoilValue(completedTaskAtom);
  return (
    <div className="pb-4">
      <h1 className="text-center page-title">Completed Tasks</h1>
      {completedTasks.length === 0 ? (
        <div className="card shadow-lg  bg-white rounded  mb-4 mx-auto card-class">
          <div className="card-header">
            <h2>No Completed Tasks</h2>
          </div>
          <div className="card-body">
            <p>You have no completed tasks. Chill out</p>
          </div>
        </div>
      ) : (
        completedTasks.map((task, index) => {
          return (
            <div className="card shadow-lg mb-5 bg-white rounded  mb-4 mx-auto card-class">
              <div className="card-header">
                <h2 className="task-name">{task.taskName}</h2>
              </div>
              <div className="card-body">
                <h5 className="card-title custom-message">{task.reminderConfig.customMessage}</h5>
                <div className="row g-0 mt-4">
                  <div className="col-2">
                    <img src={calendar} className="image"></img>
                  </div>
                  <div className="col-10">
                    <p className="date">Date: {dayjs(task.reminderDate).format("dddd, MMM D, YYYY")}</p>
                  </div>
                </div>
                <div className="row g-0">
                  <div className="col-2">
                    <img src={clock} className="image"></img>
                  </div>
                  <div className="col-10">
                    <p className="time">Time: {task.reminderTime}</p>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm btn-block" onClick={() => removeCompletedTask(task.taskID)}>
                  <img src={bin} className="image"></img> Delete Task
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CompletedTasks;
