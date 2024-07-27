const Task = require("../models/Task");
const { Op } = require("sequelize");
const { CATEGORIES, PRIORITIES } = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Task.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'title', 'description', 'completed', 'priority', 'imageUrl', 'category', 'createdAt']
    });

    res.json({
      tasks: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalTasks: count,
    });
  } catch (error) {
    console.error("Error in getAllTasks:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  console.log("task created: ", req.body);
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.priority) filter.priority = req.query.priority;

    const tasks = await Task.findAll({ where: filter });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await Task.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTaskByTitle = async (req, res) => {
  try {
    const result = await Task.destroy({ where: { title: req.body.title } });
    if (result === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    const updatedTask = await Task.findByPk(req.params.id);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.toggleTaskComplete = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    res.json(CATEGORIES);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPriorities = async (req, res) => {
  try {
    res.json(PRIORITIES);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};