import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './style.css'; // Import the CSS file

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/todos';

function App() {
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const addTodo = (text) => {
        axios.post(API_URL, { title: text })
            .then(response => {
                setTodos([...todos, response.data]);
            })
            .catch(error => console.error('Error adding todo:', error));
    };

    const updateTodo = (id, updatedText) => {
        axios.put(`${API_URL}/${id}`, { title: updatedText })
            .then(response => {
                setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
                setEditTodo(null);
            })
            .catch(error => console.error('Error updating todo:', error));
    };

    const deleteTodo = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    return (
        <div className="App">
            <h1 className="app-title">To-Do List</h1>
            <TodoForm 
                onSubmit={editTodo ? (text) => updateTodo(editTodo._id, text) : addTodo} 
                editTodo={editTodo} 
                onCancel={() => setEditTodo(null)} 
            />
            <TodoList todos={todos} onEdit={(todo) => setEditTodo(todo)} onDelete={deleteTodo} />
        </div>
    );
}

export default App;
