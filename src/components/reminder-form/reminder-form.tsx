import React, { FormEvent } from "react";

const Form = ({}: {}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div>
        <input type="text" className="form-control" placeholder="Add a remider" />
      </div>
      <div className="mt-2">
        <input type="text" className="form-control" placeholder="How do you want to be reminded?" />
      </div>
      <div className="mt-2">
        <button type="submit" className="btn btn-primary">
          Add reminder to your list
        </button>
      </div>
    </form>
  );
};

export default Form;
