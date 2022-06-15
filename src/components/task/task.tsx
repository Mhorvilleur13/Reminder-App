import React, { useState } from "react";
import { Task } from "../../types/task";
import { useRecoilState } from "recoil";
import { completedTaskAtom, tasksAtom } from "../../state/atoms";
import "../../index.css";
import dayjs from "dayjs";
import calendar from "../../assets/images/calendar.png";
import clock from "../../assets/images/back-in-time.png";
import bin from "../../assets/images/delete-16.png";
import check from "../../assets/images/checkmark-16.png";
import { useLocation } from "react-router-dom";

interface TaskComponentProps {
  task: Task;
  completeTask: (index: number) => void;
  removeTask: (id: string) => void;
  index: number;
}

const TaskComponent = ({
  task: {
    taskName,
    taskID,
    reminderConfig: { customMessage },
    reminderDate,
    reminderTime,
  },
  completeTask,
  removeTask,
  index,
}: TaskComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="card shadow-lg mb-5 bg-white rounded  mb-4 mx-auto card-class">
        <div className="card-header">
          <h2 className="task-name">{taskName}</h2>
        </div>
        <div className="card-body">
          <h5 className="card-title custom-message">{customMessage}</h5>
          <div className="row g-0 mt-4">
            <div className="col-2">
              <img src={calendar} className="image"></img>
            </div>
            <div className="col-10">
              <p className="date">Date: {dayjs(reminderDate).format("dddd, MMM D, YYYY")}</p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-2">
              <img src={clock} className="image"></img>
            </div>
            <div className="col-10">
              <p className="time">Time: {reminderTime}</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm btn-block" onClick={() => completeTask(index)}>
            {" "}
            <img src={check} className="image"></img> Task Complete
          </button>
          <button className="btn btn-primary btn-sm btn-block" onClick={() => setIsOpen(true)}>
            <img src={bin} className="image"></img> Delete Task
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="modal show" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskComponent;
