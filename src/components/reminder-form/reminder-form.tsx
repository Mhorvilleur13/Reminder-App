import React, { useState } from "react";

import { HOURS } from "../../types/time";
import { ReminderType } from "../../types/reminder-config";
import { RecurrenceType } from "../../types/recurrence-config";
import { Task } from "../../types/task";
import { logger } from "../../services/logger";
import { useRecoilState, useRecoilValue } from "recoil";
import { missedTaskState, tasksAtom } from "../../state/atoms";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const Form = () => {
  const [taskName, setTaskName] = useState("");
  const [taskMessage, setTaskMessage] = useState("");
  const [reminderType, setReminderType] = useState<ReminderType>(ReminderType.SMS);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [reccurenceType, setReccuringFrequency] = useState<RecurrenceType>(RecurrenceType.HOURLY);
  const [reminderBeforeMs, setReminderBeforeMs] = useState(1 * HOURS);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const { handleSubmit } = useForm();

  const onSubmit = (_data: any, _e: any) => {
    const removeDash = (str: string) => {
      const newStr = str.replace(/-/g, "");
      return newStr;
    };
    //_data.preventDefault();
    const newTask: Task = {
      taskName: taskName,
      recurring: isRecurring,
      reminderDate: reminderDate,
      reminderTime: reminderTime,
      tags: [],
      recurrenceConfig: {
        recurrenceType: reccurenceType,
      },
      reminderConfig: {
        customMessage: taskMessage,
        remindBeforeMs: Number(reminderBeforeMs),
        reminderTypes: [reminderType],
      },
    };
    logger.info("Task form submitted", newTask);
    //sorts the tasks in order of date
    const newTasks = [...tasks];
    newTasks.push(newTask);
    const sortedTasks = newTasks.sort(
      (a, b) => parseInt(removeDash(a.reminderDate)) - parseInt(removeDash(b.reminderDate))
    );
    setTasks(sortedTasks);
    _e.target.reset();
  };

  const recurringTypes = [
    RecurrenceType.ONCE,
    RecurrenceType.HOURLY,
    RecurrenceType.DAILY,
    RecurrenceType.WEEKLY,
    RecurrenceType.MONTHLY,
    RecurrenceType.ANUALLY,
  ];
  const reminderTypesArray = [ReminderType.EMAIL, ReminderType.IN_APP, ReminderType.SMS];
  return (
    <div className="row">
      <h1 className="text-center">Add a New Task</h1>
      <div className="col-8 mx-auto border">
        <form onSubmit={handleSubmit(onSubmit)} className="form-group" id="form">
          <div className="border-0 text-secondary mt-3">
            <h6>Task title</h6>
            <input
              onChange={(e) => setTaskName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="E.g. Buy milk"
            />
          </div>
          <div className=" border-0 mt-3 text-secondary ">
            <h6>What would you like the reminder to say?</h6>
            <textarea id="custom-message" onChange={(e) => setTaskMessage(e.target.value)} className="form-control" />
          </div>
          <div className=" border-0 mt-3 text-secondary">
            <h6>How would you like to be reminded?</h6>
            {reminderTypesArray.map((reminderType, index) => {
              return (
                <div key={`reminder-type-${reminderType}-${index}`} className="form-check">
                  <input
                    value={index}
                    type="checkbox"
                    className="form-check-input"
                    id={`reminder-type-${reminderType}-${index}`}
                    onChange={(e) => setReminderType(reminderTypesArray[Number(e.target.value)])}
                  />
                  <label className="form-check-label" htmlFor={`reminder-type-${reminderType}-${index}`}>
                    {reminderType}
                  </label>
                </div>
              );
            })}
          </div>
          <div className=" border-0 mt-3 text-secondary">
            <h6>When would you like to be reminded?</h6>
            <input onChange={(e) => setReminderDate(e.target.value)} type="date" className="form-control" />
          </div>
          <div className=" border-0 mt-3 text-secondary">
            <h6>What time would you like to be reminded?</h6>
            <input onChange={(e) => setReminderTime(e.target.value)} type="time" className="form-control" />
          </div>
          <div className=" border-0 mt-3 text-secondary">
            <h6>How many hours before would you like to be reminded?</h6>
            <input
              value={reminderBeforeMs / HOURS}
              onChange={(e) => {
                const hours = Number(e.target.value) * HOURS;
                setReminderBeforeMs(hours > 0 ? hours : 0);
              }}
              type="number"
              className="form-control w-25"
            />
          </div>
          <div className=" border-0 mt-3 text-secondary">
            <h6>Is this a recurring task?</h6>
            <div className="row">
              <div onClick={() => setIsRecurring(true)}>
                <input id="is-recurring-yes" checked={isRecurring} readOnly type="radio" />
                <label className="ml-2" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div onClick={() => setIsRecurring(false)}>
                <input id="is-recurring-no" checked={!isRecurring} readOnly type="radio" />
                <label className="ml-2" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>
          {isRecurring && (
            <div className="border-0 mt-3 text-secondary">
              <h6>How frequently do you want this task to be scheduled?</h6>
              <select
                onChange={(e) => setReccuringFrequency(recurringTypes[Number(e.target.value)])}
                id="reminder-frequency"
                name="reminder"
                className="form-control"
              >
                {recurringTypes.map((recurringType, index) => {
                  return (
                    <option key={`recurring-type-${recurringType}-${index}`} value={index}>
                      {recurringType}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <div className="mt-3">
            <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-target={"#submitModal"}>
              Add reminder to your list
            </button>
            <div
              className="modal fade"
              id={"submitModal"}
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
