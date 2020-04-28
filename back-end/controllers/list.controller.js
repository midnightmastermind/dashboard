const List = require('../models/list.model');
const mongoose = require('mongoose');
// Display list of all lists.
exports.lists = function(req, res) {
    List.find()
        .populate('tasks')
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display detail page for a specific list.
exports.list_detail = function(req, res) {
    List.findById(req.params.id)
        .populate('tasks')
        .then(list => res.json(list))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display list create form on GET.
exports.list_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: list create GET');
};

// Handle list create on POST.
exports.list_create_post = function(req, res) {
    const title = req.body.title;
    const newList = new List({
        title,
        tasks: []
    });

    newList.save()
    .then(() => res.json('New List added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Display list delete form on GET.
exports.list_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: list delete GET');
};

// Handle list delete on POST.
exports.list_delete_post = function(req, res) {
    List.findByIdAndDelete(req.params.id)
        .then(() => res.json('List deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display list update form on GET.
exports.list_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: list update GET');
};

// Handle list update on POST.
exports.list_update_post = function(req, res) {
    List.findById(req.params.id)
        .then(list => {
            list.title = req.body.title;
            list.tasks = req.body.tasks;
            list.save()
                .then(() => res.json('List updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
};
