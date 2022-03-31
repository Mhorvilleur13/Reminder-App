import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/about/about";
import Form from "./components/reminder-form/reminder-form";
import { useState } from "react";
import { Task } from "./types/task";
import AllTasks from "./components/all-tasks/all-tasks";
import TaskComponent from "./components/task/task";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { tasksAtom, todayTaskState, upcomingTasksState } from "./state/atoms";
import UpcomingReminders from "./components/upcoming-reminders/upcoming-reminders";
import TodaysReminders from "./components/todays-reminders/todays-reminder";

const App = () => {
  const tasks = useRecoilValue(tasksAtom);
  const todayReminders = useRecoilValue(todayTaskState);
  const upcoming = useRecoilValue(upcomingTasksState);
  return (
    <div className="mt-4 container">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <Link to="/" className="btn btn-primary">
              Add Task
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <Link to="/tasks" className="btn btn-primary">
              All Reminders <span className="badge badge-light text-dark">{tasks.length > 0 && tasks.length}</span>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <Link to="/today" className="btn btn-primary">
              Today&apos;s Tasks{" "}
              <span className="badge badge-light text-dark">{todayReminders.length > 0 && todayReminders.length}</span>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <Link to="/upcoming" className="btn btn-primary">
              Upcoming Tasks{" "}
              <span className="badge badge-light text-dark">{upcoming.length > 0 && upcoming.length}</span>
            </Link>
          </div>
        </div>
        <div className="col">
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
          <Route path="/today" element={<TodaysReminders />} />
          <Route path="/" element={<Form />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
