import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/about/about";
import Form from "./components/reminder-form/reminder-form";
import { useState } from "react";
import { Task, Tasks } from './types/task';
import AllReminders from "./components/all-reminders/all-reminders";
import { atom, useRecoilState } from 'recoil';


const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskToAdd: Task) => {
    let newTaskArray = [...tasks];
    newTaskArray.push(taskToAdd);
    setTasks(newTaskArray);
  }
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
        <AllReminders />
      </div>
    </div>
  );
};

export default App;
