const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const TaskSchema = new Schema({
    title: { type: String },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List'}
})

//create model
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
