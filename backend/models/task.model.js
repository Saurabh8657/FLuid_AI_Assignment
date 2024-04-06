const mongoose = require('mongoose');


//creating Task schema
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
        enum: ["low", "medium", "high"], // Assuming priority can only be one of these values
        required: true,
        default: "medium" // Default priority is set to "medium" if not provided
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"], // Assuming status can only be one of these values
        required: true,
        default: "pending" // Default status is set to "pending" if not provided
    },
    userId: {
        type: String,
        required: true
    }
},{
    versionKey: false
})



//creating Task model
const TaskModel = mongoose.model('tasks', taskSchema);


//exporting Task model
module.exports = {
    TaskModel
}