import React, { FC, useState } from "react";
import Form from "./components/reminder-form/reminder-form";
import AllReminders from "./components/all-reminders/all-reminders";
import TodaysReminders from "./components/todays-reminders/todays-reminder";
import UpcomingReminders from "./components/upcoming-reminders/upcoming-reminders";
import { ITask } from "./types/task";

const App: FC = () => {
  return (
    <div className="App">
      <Form />
    </div>
  );
};

export default App;
