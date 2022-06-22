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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  return (
    <div>
      <div className="card shadow-lg mb-5 bg-white rounded  mb-4 mx-auto card-class" key={`task-${index}`}>
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
          <button className="btn btn-primary btn-sm btn-block" onClick={() => setIsCompleteModalOpen(true)}>
            <img src={check} className="image"></img> Task Complete
          </button>
          <button className="btn btn-primary btn-sm btn-block" onClick={() => setIsDeleteModalOpen(true)}>
            <img src={bin} className="image"></img> Delete Task
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <div className="modal fade show d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => setIsDeleteModalOpen(false)}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you would like to delete this task?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    removeTask(taskID);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCompleteModalOpen && (
        <div className="modal fade show d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Completion</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => setIsCompleteModalOpen(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you this Task is Complete?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsCompleteModalOpen(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setIsCompleteModalOpen(false);
                    completeTask(index);
                  }}
                >
                  Task Complete
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
