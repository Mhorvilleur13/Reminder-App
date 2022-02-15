import React, { useState, FC, FormEvent } from 'react';
import { ReminderType } from '../../types/reminder';

export default function Form({ addTask }) {
    const [task, setTask] = useState<string>('');
    const [type, setType] = useState<string>('');
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!value) return;
        console.log('submit value to database');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                className="input"
                value={task}
                placeholder="Add a remider"
                onChange={e => setValue(e.target.value)}>
            </input>
            <input type="text"
                className="input"
                placeholder="How do you want to be reminded?"
                onChange={e => setType(e.target.value)}>
            </input>
            <button type="submit">Add reminder to your list.</button>
        </form>
    )
}