import React, { useState, useEffect } from 'react';

function TodoForm({ onSubmit, editTodo, onCancel }) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (editTodo) {
            setText(editTodo.title);
        } else {
            setText('');
        }
    }, [editTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
        setText('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter todo"
                required
            />
            <button type="submit" className="btn btn-submit">
                {editTodo ? 'Update Todo' : 'Add Todo'}
            </button>
            {editTodo && <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>}
        </form>
    );
}

export default TodoForm;
