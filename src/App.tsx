import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/about/about";
import Form from "./components/reminder-form/reminder-form";

const App = ({}: {}) => {
  return (
    <div className="mt-4 container">
      <div className="row">
        <div className="col">
          <Link to="/" className="text-decoration-none">
            <h1>Reminder app</h1>
          </Link>
        </div>
        <div className="col">
          <div className="text-right">
            <Link to="/about" className="btn btn-primary">
              About
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
