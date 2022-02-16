import React, { FormEvent } from "react";

const Form = ({}: {}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" placeholder="Add a remider"></input>
      <input type="text" className="input" placeholder="How do you want to be reminded?"></input>
      <button type="submit">Add reminder to your list.</button>
    </form>
  );
};

export default Form;
