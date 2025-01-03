import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo, getTodoById, updateTodoCompletion } from '../controllers/todo.controller.js';
import { authenticateUser } from '../middleware/auth.js';

const todo_router = express.Router();

todo_router.get('/getTodos', authenticateUser, getTodos);
todo_router.post('/createTodo', authenticateUser, createTodo);
todo_router.get('/getTodo/:id', authenticateUser, getTodoById);
todo_router.put('/updateTodo/:id', authenticateUser, updateTodo);
todo_router.delete('/deleteTodo/:id', authenticateUser, deleteTodo);
todo_router.patch('/updateTodoCompletion/:id', authenticateUser, updateTodoCompletion);

export default todo_router;
