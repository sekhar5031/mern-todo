const Todo = require('../models/Todo');

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = new Todo({
      title: req.body.title
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

// Update an existing todo
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' }); // Added closing quote and curly brace
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
