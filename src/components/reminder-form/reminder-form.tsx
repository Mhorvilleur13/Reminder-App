import React, { FormEvent, useState } from "react";


const Form = ({ }: {}) => {
  const [taskName, setTaskName] = useState('');
  const [taskMessage, setTaskMessage] = useState('');
  const [reminderType, setReminderType] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [recurring, setRecurring] = useState(true);
  const [reccuringFrequency, setReccuringFrequency] = useState('');
  const [reminderBeforeMs, setMs] = useState('');
  let task = []
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let taskObject = {
      taskName: taskName,
      reminderDate: reminderDate,
      recurring: recurring,
      recurranceConfig: {
        reccuringFrequency: reccuringFrequency,
      },
      reminderConfig: {
        customeMessage: taskMessage,
        reminderBeforeMs: reminderBeforeMs,
        reminderType: reminderType,
      }
    }
    console.log(taskObject);
  };
  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div>
        <input onChange={e => setTaskName(e.target.value)} type="text" className="form-control" placeholder="Remider Title" />
      </div>
      <div className="card mt-3 text-secondary ">
        <h6>What would you like the reminder to say?</h6>
        <textarea id="custom-message" onChange={e => setTaskMessage(e.target.value)}></textarea>
      </div>
      <div className="mt-3">
        <input onChange={e => setReminderType(e.target.value)} type="text" className="form-control" placeholder="How would you like to be reminded?" />
      </div>
      <div className=" card mt-3 text-secondary">
        <h6>When would you like to be reminded?</h6>
        <input onChange={e => setReminderDate(e.target.value)} type="date"></input>
      </div>
      <div className="card mt-3 text-secondary" >
        <h6>Is this a recurring task?</h6>
        <select onChange={e => setRecurring(e.target.value === "yes" ? true : false)}>
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
      </div>
      <div className="card mt-3 text-secondary">
        <h6>How often would would like to be reminded?</h6>
        <select onChange={e => setReccuringFrequency(e.target.value)} id="reminder-frequency" name="reminder">
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="anually">Anually</option>
        </select>
      </div>
      <div className="card mt-3 text-secondary">
        <h6>How many hours before would you like to be reminded?</h6>
        <input onChange={e => setMs(e.target.value)} type="number" className="col-4"></input>
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
