const express = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { TaskModel } = require('../model/task.model');
require('dotenv').config();

const tasksRouter = express.Router() ;

//--- Retrieving a list of all tasks ---//
tasksRouter.get("/", auth, async (req, res) => {
    try {
        const { userId } = req.body;
        const usersTasks = await TaskModel.find({userId}) ;
        res.status(200).json({tasks: usersTasks});
    } catch (error) {
        res.status(500).json({"Internal Server Error": error});
    }
})

//--- Retrieving a single task by ID ---//
tasksRouter.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const task = await TaskModel.findOne({_id: id, userId}) ;
        res.status(200).json({tasks: task});
    } catch (error) {
        res.status(500).json({"Internal Server Error": error});
    }
})

//--- Creating a new task---//
tasksRouter.post("/add", auth, async (req, res) => {
    try {
        const { title, description, dueDate, priority, status , userId } = req.body;
        const newTask = { title, description, dueDate, priority, status , userId};
        const taskToSave = new TaskModel(newTask);
        await taskToSave.save();
        res.status(200).json({"New Task Added": newTask});
    } catch (error) {
        res.status(500).json({"Internal Server Error": error});
    }
})

//--- Updating an existing task ---//
tasksRouter.patch("/update/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, status } = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate({_id: id}, {title, description, dueDate, priority, status});
        res.status(200).json({"Task Updated": updatedTask});
    } catch(error) {
        res.status(500).json({"Internal Server Error": error});
    }
})

//--- Deleting a task ---//
tasksRouter.delete("/delete/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete({_id: id});
        res.status(200).json({"Task Deleted": deletedTask});
    }catch(error) {
        res.status(500).json({"Internal Server Error": error});
    }
})


module.exports = {
    tasksRouter,
}
