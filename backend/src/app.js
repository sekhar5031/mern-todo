const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware
app.use(express.json());
app.use('/todos', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
