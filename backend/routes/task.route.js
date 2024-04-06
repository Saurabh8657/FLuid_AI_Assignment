const mongoose = require('mongoose');
const express = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { TaskModel } = require('../models/task.model');
require('dotenv').config();


//router middleware
const taskRouter = express.Router();



//get all tasks route
taskRouter.get("/", auth, async (req, res) => {
    try {
        const { userId } = req.body;
        const usersTasks = await TaskModel.find({userId}) ;
        res.status(200).json({tasks: usersTasks});
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})


//get single task by id route
taskRouter.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const usersTask = await TaskModel.findOne({_id: id, userId}); ;
        res.status(200).json({tasks: usersTask});
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})



//add task route
taskRouter.post("/add", auth, async (req, res) => {
    try {
        const { title, description, dueDate, priority, status, userId } = req.body;
        const newTask = new TaskModel({ title, description, dueDate, priority, status, userId });
        await newTask.save();
        res.status(200).json({msg: "Task Added Successfully", newTask});
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})



//update task route
taskRouter.patch("/update/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, status } = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate({_id: id}, { title, description, dueDate, priority, status });
        res.status(200).json({msg: "Task Updated Successfully", updatedTask});
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})



//delete task route
taskRouter.delete("/delete/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete({_id: id});
        res.status(200).json({msg: "Task Deleted Successfully", deletedTask});
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})



//exporting task route
module.exports = {
    taskRouter
}