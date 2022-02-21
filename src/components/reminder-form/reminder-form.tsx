import React, { FormEvent, useState } from "react";


const Form = ({ }: {}) => {
  const [taskName, setTaskName] = useState('');
  const [recurring, setRecurring] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div>
        <input type="text" className="form-control" placeholder="Remider Title" />
      </div>
      <div className="card mt-3 text-secondary ">
        <h6>What would you like the reminder to say?</h6>
        <textarea id="custom-message" ></textarea>
      </div>
      <div className="mt-3">
        <input type="text" className="form-control" placeholder="How would you like to be reminded?" />
      </div>
      <div className=" card mt-3 text-secondary">
        <h6>When would you like to be reminded?</h6>
        <input type="date"></input>
      </div>
      <div className="card mt-3 text-secondary" >
        <h6>Is this a recurring task?</h6>
        <button className="btn btn-primary col-2" type="button"> YES</button>
      </div>
      <div className="card mt-3 text-secondary">
        <h6>How often would would like to be reminded?</h6>
        <select id="reminder-frequency" name="reminder">
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="anually">Anually</option>
        </select>
      </div>
      <div className="card mt-3 text-secondary">
        <h6>How many hours before would you like to be reminded?</h6>
        <input type="number" className="col-1"></input>
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
