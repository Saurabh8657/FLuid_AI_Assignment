const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
        default: "medium" // Default priority is set to "medium" if not provided
    }, 
    status: {
        type: String,
        enum: ["pending", "inProgress", "completed"],
        required: true,
        default: "pending" // Default status is set to "pending" if not provided
    },
    userId: {
        type: String,
        required: true
    },
},{
    versionKey: false
}); 

const TaskModel = mongoose.model("tasks", taskSchema);

module.exports = { 
    TaskModel,
}
