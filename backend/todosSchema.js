let mongoose = require("mongoose");

let todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"userModule"}
},{ timestamps: true })

let todosModule = mongoose.model("todo",todoSchema);

module.exports = {todosModule}