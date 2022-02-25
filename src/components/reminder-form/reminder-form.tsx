import React, { FormEvent, useState } from "react";
import { ReminderType } from "../../types/reminder-config";
import { RecurrenceType } from "../../types/recurrence-config";
import { Task } from "../../types/task";

const Form = () => {
  const [taskName, setTaskName] = useState("");
  const [taskMessage, setTaskMessage] = useState("");
  const [reminderType, setReminderType] = useState<ReminderType>(ReminderType.SMS);
  const [tags] = useState([]);
  const [reminderDate, setReminderDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [reccurenceType, setReccuringFrequency] = useState<RecurrenceType>(RecurrenceType.HOURLY);
  const [reminderBeforeMs, setMs] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const taskObject: Task = {
      taskName: taskName,
      recurring: recurring,
      reminderDate: reminderDate,
      tags: tags,
      recurrenceConfig: {
        recurrenceType: reccurenceType,
      },
      reminderConfig: {
        customMessage: taskMessage,
        remindBeforeMs: Number(reminderBeforeMs),
        reminderTypes: [reminderType],
      },
    };
    console.log(taskObject);
  };
  const recurringTypes = [
    RecurrenceType.HOURLY,
    RecurrenceType.DAILY,
    RecurrenceType.WEEKLY,
    RecurrenceType.MONTHLY,
    RecurrenceType.ANUALLY,
  ];

  const reminderTypesArray = [ReminderType.EMAIL, ReminderType.IN_APP, ReminderType.SMS];

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div>
        <input
          onChange={(e) => setTaskName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Remider Title"
        />
      </div>
      <div className="card mt-3 text-secondary ">
        <h6>What would you like the reminder to say?</h6>
        <textarea id="custom-message" onChange={(e) => setTaskMessage(e.target.value)}></textarea>
      </div>
      <div className=" card mt-3 text-secondary">
        <h6>How would you like to be reminded?</h6>
        <select
          onChange={(e) => setReminderType(reminderTypesArray[Number(e.target.value)])}
          id="reminder-type"
          name="reminder-type"
          multiple
        >
          {reminderTypesArray.map((reminderType, index) => {
            return <option value={index}>{reminderType}</option>;
          })}
        </select>
      </div>
      <div className=" card mt-3 text-secondary">
        <h6>When would you like to be reminded?</h6>
        <input onChange={(e) => setReminderDate(e.target.value)} type="date" />
      </div>
      <div className="card mt-3 text-secondary">
        <h6>Is this a recurring task?</h6>
        <label htmlFor="yes">Yes</label>
        <input
          id="yes"
          value="yes"
          type="radio"
          onChange={(e) => setRecurring(e.target.checked === true ? true : false)}
        />
        <label htmlFor="no">No</label>
        <input
          id="no"
          value="no"
          type="radio"
          onChange={(e) => setRecurring(e.target.checked === true ? false : true)}
        />
      </div>
      <div className="card mt-3 text-secondary">
        <h6>How often would would like to be reminded?</h6>
        <select
          onChange={(e) => setReccuringFrequency(recurringTypes[Number(e.target.value)])}
          id="reminder-frequency"
          name="reminder"
        >
          {recurringTypes.map((recurringType, index) => {
            return <option value={index}>{recurringType}</option>;
          })}
        </select>
      </div>
      <div className="card mt-3 text-secondary">
        <h6>How many hours before would you like to be reminded?</h6>
        <input onChange={(e) => setMs(e.target.value)} type="number" className="col-4" />
      </div>
      <div className="mt-3">
        <button type="submit" className="btn btn-primary">
          Add reminder to your list
        </button>
      </div>
    </form>
  );
};

export default Form;
