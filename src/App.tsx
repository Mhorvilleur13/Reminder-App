import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/about/about";
import Form from "./components/reminder-form/reminder-form";
import { useState } from "react";
import { Task } from "./types/task";
import AllTasks from "./components/all-tasks/all-tasks";
import TaskComponent from "./components/task/task";
import { atom, useRecoilState } from "recoil";
import UpcomingReminders from "./components/upcoming-reminders/upcoming-reminders";

const App = () => {
  return (
    <div className="mt-4 container">
      <div className="row">
        <div className="col-3">
          <div className="text-center">
            <Link to="/tasks" className="btn btn-primary">
              Reminders
            </Link>
          </div>
        </div>
        <div className="col-3">
          <div className="text-center">
            <Link to="/" className="btn btn-primary">
              Add Task
            </Link>
          </div>
        </div>
        <div className="col-3">
          <div className="text-center">
            <Link to="/upcoming" className="btn btn-primary">
              Upcoming Tasks
            </Link>
          </div>
        </div>
        <div className="col-3">
          <div className="text-center">
            <Link to="/about" className="btn btn-primary">
              About
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Routes>
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/upcoming" element={<UpcomingReminders />} />
          <Route path="/" element={<Form />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
