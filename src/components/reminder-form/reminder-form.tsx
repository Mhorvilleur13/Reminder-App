import React, { useState, FC, FormEvent } from 'react';
import { ReminderType } from '../../types/reminder';

export default function Form() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        //if (!value) return;
        console.log('submit value to database');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                className="input"
                placeholder="Add a remider"
            // onChange={ }
            >
            </input>
            <input type="text"
                className="input"
                placeholder="How do you want to be reminded?"
            // onChange={ }
            >
            </input>
            <button type="submit">Add reminder to your list.</button>
        </form>
    )
}