import React, { FC, useState } from 'react';
import Form from './components/reminder-form/reminder-form';
import { ITask } from './types/task';

const App: FC = () => {
  const [task, setTask] = useState<ITask>();
  const [tasks, setTasks] = useState([]);

  const addTask = (): void => {
    let newTasks = [...tasks];
    setTasks(newTasks.push(task));
  }
  return (
    <div className="App">
      <Form addTask={addTask} />
    </div>
  )
}

export default App;
