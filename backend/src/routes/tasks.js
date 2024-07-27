const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/filter', taskController.filterTasks);
router.get('/categories', taskController.getCategories);
router.get('/priorities', taskController.getPriorities);

router.delete('/by-title', taskController.deleteTaskByTitle);

router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/toggle-complete', taskController.toggleTaskComplete);
router.delete('/:id', taskController.deleteTask);

module.exports = router;