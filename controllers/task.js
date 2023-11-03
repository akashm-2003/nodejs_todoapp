import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";

//Error Handling using try catch Block
export const newTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Task Created",
      task,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No task Found",
    });
  }
};

//Error Handling using Express Error Handling
export const allTask = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) return next(new Error("No Task Found",404));
    const task = await Task.find({ user: id });
    res.status(201).json({
      success: true,
      message: "All Task",
      task,
    });
  } catch (err) {
    next(err.message);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("No Task Found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.json({
      success: true,
      message: "Updated",
      task
    });
  } catch (err) {
    next(err.message);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("No Task Found", 404));
    await task.deleteOne();
    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    next(err.message);
  }
};
