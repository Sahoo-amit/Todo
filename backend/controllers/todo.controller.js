import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = new Todo({
      user: req.user.id,
      text,
      completed: completed ?? false,
    });

    await todo.save();
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating todo",
      error: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: error.message,
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todo",
      error: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { text } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { text },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: error.message,
    });
  }
};

export const toggleTodoCompletion = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    todo.completed = !todo.completed;

    await todo.save();
    res.status(200).json({
      success: true,
      message: `Todo ${todo.completed ? "completed" : "incompleted"}`,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating todo completion",
      error: error.message,
    });
  }
};

export const updateTodoCompletion = async (req, res) => {
  try {
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "'completed' must be a boolean" });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { completed },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo completion status updated",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating todo completion status",
      error: error.message,
    });
  }
};
