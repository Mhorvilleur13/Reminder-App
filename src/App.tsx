import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import "./index.css";
import { tasksAtom, todayTaskState, upcomingTasksState } from "./state/atoms";
import { logger } from "./services/logger";

import About from "./components/about/about";
import Form from "./components/reminder-form/reminder-form";
import AllTasks from "./components/all-tasks/all-tasks";
import UpcomingReminders from "./components/upcoming-reminders/upcoming-reminders";
import TodaysReminders from "./components/todays-reminders/todays-reminder";
import { syncGet, syncSet } from "./services/chrome";

const App = () => {
  const tasks = useRecoilValue(tasksAtom);
  const todayReminders = useRecoilValue(todayTaskState);
  const upcoming = useRecoilValue(upcomingTasksState);

  useEffect(() => {
    const key = "key";
    const value = "value";

    const testChromeStorage = async () => {
      try {
        syncSet(key, value, () => {
          logger.info(`Value of ${key} was set to ${value}`);
        });

        syncGet(key, (result) => {
          logger.info(`Value of ${key} currently is ${result[key]}`);
        });
      } catch (error) {
        logger.error(error);
      }
    };

    testChromeStorage();
  }, []);

  return (
    <div className="mt-4 container page-container">
      <div className="row">
        <div className="d-grid gap-2 col-6 mx-auto">
          <Link to="/" className="btn btn-primary btn-sm">
            Add Task
          </Link>
          <Link to="/tasks" className="btn btn-primary btn-sm">
            All Reminders <span className="badge badge-light text-dark">{tasks.length > 0 && tasks.length}</span>
          </Link>
          <Link to="/today" className="btn btn-primary btn-sm">
            Today&apos;s Tasks{" "}
            <span className="badge badge-light text-dark">{todayReminders.length > 0 && todayReminders.length}</span>
          </Link>
          <Link to="/upcoming" className="btn btn-primary btn-sm">
            Upcoming Tasks <span className="badge badge-light text-dark">{upcoming.length > 0 && upcoming.length}</span>
          </Link>
          <Link to="/about" className="btn btn-primary btn-sm">
            About
          </Link>
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
