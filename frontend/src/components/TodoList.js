import React from 'react';

function TodoList({ todos, onEdit, onDelete }) {
    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <p className="empty-message">No todos yet!</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo._id} className="todo-item">
                            <span className="todo-title">{todo.title}</span>
                            <div className="todo-actions">
                                <button className="btn btn-edit" onClick={() => onEdit(todo)}>Edit</button>
                                <button className="btn btn-delete" onClick={() => onDelete(todo._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;
