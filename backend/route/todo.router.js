import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo, getTodoById } from '../controllers/todo.controller.js';
import { authenticateUser } from '../middleware/auth.js';

const todo_router = express.Router();

todo_router.get('/getTodos', authenticateUser, getTodos);
todo_router.post('/createTodo', authenticateUser, createTodo);
todo_router.get('/getTodo/:id', authenticateUser, getTodoById);
todo_router.put('/updateTodo/:id', authenticateUser, updateTodo);
todo_router.delete('/deleteTodo/:id', authenticateUser, deleteTodo);

export default todo_router;