import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tasksAtom, todayTaskState } from "../../state/atoms";

const TodaysReminders = (index: any) => {
  const todayReminders = useRecoilValue(todayTaskState);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const removeTask = (index: any) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div>
      <h1 className="text-center">Todays Reminders</h1>
      {todayReminders.length === 0 ? (
        <h1 className="text-center mt-5">No Tasks Today</h1>
      ) : (
        todayReminders.map((task) => {
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
                <button onClick={() => removeTask(index)}>Delete Task</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodaysReminders;
