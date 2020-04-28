const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const listsRouter = require('./back-end/routes/lists');
const tasksRouter = require('./back-end/routes/tasks');

app.use('/lists', listsRouter);
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
