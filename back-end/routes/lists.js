const router = require('express').Router();
const list_controller = require('../controllers/list.controller');

// GET request for creating a list. NOTE This must come before route that displays list (uses id).
router.get('/create', list_controller.list_create_get);

//POST request for creating list.
router.post('/create', list_controller.list_create_post);

// GET request to delete list.
router.get('/:id/delete', list_controller.list_delete_get);

// POST request to delete list.
router.post('/:id/delete', list_controller.list_delete_post);

// GET request to update list.
router.get('/:id/update', list_controller.list_update_get);

// POST request to update list.
router.post('/:id/update', list_controller.list_update_post);

// GET request for one list.
router.get('/:id', list_controller.list_detail);

// GET request for list of all list.
router.get('/', list_controller.lists);


module.exports = router;
