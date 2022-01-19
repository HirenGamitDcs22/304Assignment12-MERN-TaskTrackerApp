const express=require('express')
const router=express.Router();

const tasksModel=require('../models/tasks')

//Fetch Tasks 
//GET: /tasks/list
router.get("/list",async(req,res)=>{
  const taskList = await tasksModel.find();
  if (taskList.length === 0) {
    return res.json({code:'NO_TASKS' });
  }
  return res.json({ data: taskList });
})

//GET: /tasks/fetchtask/1
router.get("/fetchtask/:id",async(req,res)=>{
  const id=req.params.id;
  const taskData=await tasksModel.findById(id)
  if(taskData.length === 0){
    return res.json({msg:`Task is not found for id ${id}`,code:'NO_TASK_FOUND'})
  }
  return res.json({data:taskData})
})

//Add Task
//POST: /tasks/addtask
router.post("/addtask",async(req,res)=>{
    const newTask = req.body;
    const newtask=await tasksModel.create(newTask);
    return res.json({ data: newtask });
})

//Update Task
//PUT: /tasks/updatetask/1
router.put("/updatetasks/:id",async(req,res)=>{
  const id=req.params.id;
  const text=req.body.text
  const day=req.body.day
  const reminder=req.body.reminder;
  const updatedData=await tasksModel.findOneAndUpdate(
      {_id:id},
      {text:text},
      {day:day},
      {reminder: reminder},
      {new:true}
  );
  return res.json({data:updatedData});
});

//PUT: /tasks/updatereminder/1
// Update Reminder
router.put("/updatereminder/:id",async(req,res)=>{
  const id=req.params.id;
  const reminder=req.body.reminder;
  const updatedData=await tasksModel.findOneAndUpdate(
      {_id:id},
      {reminder: reminder},
      {new:true}
  );
  return res.json({data:updatedData});
});

//Delete Task
//DELETE: /tasks/deltask/1
router.delete("/deltask/:id",async(req,res)=>{
  const id=req.params.id;
  const deldata=await tasksModel.findOneAndDelete({_id:id});
  return res.json({"Deleted Data Is ":deldata});
})
module.exports=router