import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { allTask, deleteTask, newTask, updateTask } from '../controllers/task.js';

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/myTask",isAuthenticated,allTask)

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)
export default router;