import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { tasksAtom, upcomingAtom } from "../../state/atoms";

const UpcomingReminders = () => {
  const upcoming = useRecoilValue(upcomingAtom);
  return (
    <div>
      {upcoming.map((task) => {
        return (
          <div className="card bg-light mb-4" style={{ width: "18rem" }}>
            <div className="card-header">
              <h2>{task.taskName}</h2>
            </div>
            <div className="card-body">
              <p>{task.reminderConfig.customMessage}</p>
              <p>
                <b>Reminder Date:</b> {task.reminderDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingReminders;
