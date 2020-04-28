const Task = require('../models/task.model');
const List = require('../models/list.model');
List.find('save')
const mongoose = require('mongoose');
// Display task of all tasks.
exports.tasks = function(req, res) {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display detail page for a specific task.
exports.task_detail = function(req, res) {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display task create form on GET.
exports.task_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: task create GET');
};

// Handle task create on POST.
exports.task_create_post = function(req, res) {
    const title = req.body.title;
    const listId = req.body.list;
    const newTask = new Task({
        title,
        list: listId,
        _id: new mongoose.Types.ObjectId(),
    });

    newTask.save(err => {
        List.findById(listId)
            .then(list => {
                list.tasks.push(newTask._id);
                list.save()
                    .then(() => res.json('List updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });
};

// Display task delete form on GET.
exports.task_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: task delete GET');
};

// Handle task delete on POST.
exports.task_delete_post = function(req, res) {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display task update form on GET.
exports.task_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: task update GET');
};

// Handle task update on POST.
exports.task_update_post = function(req, res) {
    Task.findById(req.params.id)
        .then(task => {
            task.title = req.body.title;
            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
};
