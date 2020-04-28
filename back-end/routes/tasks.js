const router = require('express').Router();
const task_controller = require('../controllers/task.controller');

// GET request for creating task. NOTE This must come before route for id (i.e. display task).
router.get('/create', task_controller.task_create_get);

// POST request for creating task.
router.post('/create', task_controller.task_create_post);

// GET request to delete task.
router.get('/:id/delete', task_controller.task_delete_get);

// POST request to delete task.
router.post('/:id/delete', task_controller.task_delete_post);

// GET request to update task.
router.get('/:id/update', task_controller.task_update_get);

// POST request to update task.
router.post('/:id/update', task_controller.task_update_post);

// GET request for one task.
router.get('/:id', task_controller.task_detail);

// GET request for list of all tasks.
router.get('/', task_controller.tasks);

module.exports = router;
