import React, { FormEvent, useState } from "react";

import { HOURS } from "../../types/time";
import { ReminderType } from "../../types/reminder-config";
import { RecurrenceType } from "../../types/recurrence-config";
import { Task } from "../../types/task";
import { logger } from "../../services/logger";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { tasksAtom } from "../../state/atoms";

const Form = () => {
  const [taskName, setTaskName] = useState("");
  const [taskMessage, setTaskMessage] = useState("");
  const [reminderType, setReminderType] = useState<ReminderType>(ReminderType.SMS);
  const [reminderDate, setReminderDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [reccurenceType, setReccuringFrequency] = useState<RecurrenceType>(RecurrenceType.HOURLY);
  const [reminderBeforeMs, setReminderBeforeMs] = useState(1 * HOURS);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    const removeDash = (str: string) => {
      const newStr = str.replace(/-/g, "");
      return newStr;
    };
    e.preventDefault();
    const newTask: Task = {
      taskName: taskName,
      recurring: isRecurring,
      reminderDate: reminderDate,
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
    <form onSubmit={handleSubmit} className="form-group">
      <div className="card border-0 text-secondary">
        <h6>Task title</h6>
        <input
          onChange={(e) => setTaskName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="E.g. Buy milk"
        />
      </div>
      <div className="card border-0 mt-3 text-secondary ">
        <h6>What would you like the reminder to say?</h6>
        <textarea id="custom-message" onChange={(e) => setTaskMessage(e.target.value)} className="form-control" />
      </div>
      <div className="card border-0 mt-3 text-secondary">
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
      <div className="card border-0 mt-3 text-secondary">
        <h6>When would you like to be reminded?</h6>
        <input onChange={(e) => setReminderDate(e.target.value)} type="date" className="form-control" />
      </div>
      <div className="card border-0 mt-3 text-secondary">
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
      <div className="card border-0 mt-3 text-secondary">
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
        <div className="card border-0 mt-3 text-secondary">
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
        <button type="submit" className="btn btn-primary">
          Add reminder to your list
        </button>
      </div>
    </form>
  );
};

export default Form;
