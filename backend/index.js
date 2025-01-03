import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './utils/db.js';
import router from './route/auth.router.js';
import todo_router from './route/todo.router.js';
import cors from 'cors';

config()

const app = express();
app.use(express.json())

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use('/api', router)
app.use('/api/todo', todo_router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB()
})