const mongoose = require("mongoose")

const tasksSchema=mongoose.Schema({
    id:Number,
    text:String,
    day:String,
    reminder:Boolean
})
const tasksModel=mongoose.model("tasks",tasksSchema,"tasks")

module.exports=tasksModel