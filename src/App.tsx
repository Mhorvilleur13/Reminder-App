import React, { useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import "./index.css";
import {
  completedTaskAtom,
  missedTaskState,
  recurringTaskState,
  tasksAtom,
  todayTaskState,
  upcomingTasksState,
} from "./state/atoms";
import { logger } from "./services/logger";
import About from "./components/about/about";
import Form from "./components/reminder-form/reminder-form";
import AllTasks from "./components/all-tasks/all-tasks";
import UpcomingReminders from "./components/upcoming-reminders/upcoming-reminders";
import TodaysReminders from "./components/todays-reminders/todays-reminder";
import MissedTasks from "./components/missed-tasks/missed-tasks";
import { resourceLimits } from "worker_threads";
import Recurring from "./components/recurring/recurring";
import dayjs from "dayjs";
import CompletedTasks from "./components/completed.tasks/completed.tasks";

export interface CompleteTaskProp {
  completeTask: (index: number) => void;
}

const App = () => {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const todayReminders = useRecoilValue(todayTaskState);
  const upcoming = useRecoilValue(upcomingTasksState);
  const missed = useRecoilValue(missedTaskState);
  const ready = useRef(false);
  const completeReady = useRef(false);
  const recurringTasks = useRecoilValue(recurringTaskState);
  const [completedTasks, setCompletedTasks] = useRecoilState(completedTaskAtom);

  //get Tasks
  useEffect(() => {
    console.log("getting tasks");
    const getChromeStorage = () => {
      try {
        chrome.storage.sync.get("Tasks", function (result) {
          console.log("it works");
          console.log(result.Tasks);
          ready.current = true;
          if (result.Tasks) {
            setTasks(result.Tasks);
          }
        });
      } catch (error) {
        logger.error(error);
      }
    };
    getChromeStorage();
    // chrome.storage.onChanged.addListener(function (changes, namespace) {
    //   // remove for loop and check if changes.Tasks then set tasks to changes.Tasks.newValue
    //   for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    //     console.log(
    //       `Storage key "${key}" in namespace "${namespace}" changed.`,
    //       `Old value was "${oldValue}", new value is "${newValue}".`
    //     );
    //   }
    // });
    const interval = setInterval(getChromeStorage, 30000);
    // clean up interval and remove onchanged listener
    return () => clearInterval(interval);
  }, []);

  // Set Tasks
  useEffect(() => {
    if (!ready.current) {
      return;
    }
    console.log(`setting tasks: ${tasks}`);
    const setChromeStorage = async () => {
      try {
        chrome.storage.sync.set({ Tasks: tasks }, function () {
          console.log(tasks);
        });
      } catch (error) {
        logger.error(error);
      }
    };

    setChromeStorage();
  }, [tasks]);

  //get completed Tasks
  useEffect(() => {
    console.log("getting tasks");
    const getChromeStorage = () => {
      try {
        chrome.storage.sync.get("Completed", function (result) {
          console.log("it works");
          console.log(result.Completed);
          completeReady.current = true;
          if (result.Completed) {
            setCompletedTasks(result.Completed);
          }
        });
      } catch (error) {
        logger.error(error);
      }
    };
    getChromeStorage();
    const interval = setInterval(getChromeStorage, 30000);
    // clean up interval and remove onchanged listener
    return () => clearInterval(interval);
  }, []);

  // set completed Tasks
  useEffect(() => {
    if (!completeReady.current) {
      return;
    }
    console.log(`setting tasks: ${tasks}`);
    const setChromeStorage = async () => {
      try {
        chrome.storage.sync.set({ Completed: completedTasks }, function () {
          console.log(tasks);
        });
      } catch (error) {
        logger.error(error);
      }
    };

    setChromeStorage();
  }, [completedTasks]);

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    const newCompletedTasks = [...completedTasks];
    const task = newTasks[index];
    const type = task.recurrenceConfig.recurrenceType;
    if (type === "MONTHLY") {
      newCompletedTasks.push(task);
      setCompletedTasks(newCompletedTasks);
      const newDate = dayjs(task.reminderDate).add(1, "month");
      const newTask = { ...task, reminderDate: dayjs(newDate).format("YYYY-MM-DD") };
      newTasks.splice(index, 1);
      newTasks.push(newTask);
      setTasks(newTasks);
    } else if (type === "ANNUALLY") {
      newCompletedTasks.push(task);
      setCompletedTasks(newCompletedTasks);
      const newDate = dayjs(task.reminderDate).add(1, "year");
      const newTask = { ...task, reminderDate: dayjs(newDate).format("YYYY-MM-DD") };
      newTasks.splice(index, 1);
      newTasks.push(newTask);
      setTasks(newTasks);
    } else if (type === "WEEKLY") {
      newCompletedTasks.push(task);
      setCompletedTasks(newCompletedTasks);
      const newDate = dayjs(task.reminderDate).add(1, "week");
      const newTask = { ...task, reminderDate: dayjs(newDate).format("YYYY-MM-DD") };
      newTasks.splice(index, 1);
      newTasks.push(newTask);
      setTasks(newTasks);
    } else if (type === "DAILY") {
      newCompletedTasks.push(task);
      setCompletedTasks(newCompletedTasks);
      const newDate = dayjs(task.reminderDate).add(1, "day");
      const newTask = { ...task, reminderDate: dayjs(newDate).format("YYYY-MM-DD") };
      newTasks.splice(index, 1);
      newTasks.push(newTask);
      setTasks(newTasks);
    } else if (task.recurring === false) {
      newCompletedTasks.push(task);
      setCompletedTasks(newCompletedTasks);
      newTasks.splice(index, 1);
    } else {
      console.log("Recurrance not set");
    }
  };

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
          <Link to="/missed" className="btn btn-primary btn-sm">
            Missed Tasks <span className="badge badge-danger text-white">{missed.length > 0 && missed.length}</span>
          </Link>
          <Link to="/recurring" className="btn btn-primary btn-sm">
            Recurring Tasks{" "}
            <span className="badge badge-light text-dark">{recurringTasks.length > 0 && recurringTasks.length}</span>
          </Link>
          <Link to="/completed" className="btn btn-primary btn-sm">
            Completed Tasks{" "}
            <span className="badge badge-light text-dark">{completedTasks.length > 0 && completedTasks.length}</span>
          </Link>
          <Link to="/about" className="btn btn-primary btn-sm">
            About
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <Routes>
          <Route path="/tasks" element={<AllTasks completeTask={completeTask} />} />
          <Route path="/upcoming" element={<UpcomingReminders />} />
          <Route path="/today" element={<TodaysReminders />} />
          <Route path="/" element={<Form />} />
          <Route path="/missed" element={<MissedTasks />}></Route>
          <Route path="/recurring" element={<Recurring completeTask={completeTask} />}></Route>
          <Route path="/completed" element={<CompletedTasks />}></Route>
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
