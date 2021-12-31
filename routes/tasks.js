const express=require('express')
const router=express.Router();

const tasksModel=require('../models/tasks')
router.get("/tasks",async(req,res)=>{
    const taskList = await tasksModel.find();

  if (taskList.length === 0) {
    return res.json({ data: "no Tasks in Task Tracker" });
  }

  return res.json({ data: taskList });
})

//Add Task
router.post("/tasks",async(req,res)=>{
    const newTask = req.body;
    tasksModel.create(newTask);
    return res.json({ data: newTask });
})
//Update Task

//Delete Task

module.exports=router