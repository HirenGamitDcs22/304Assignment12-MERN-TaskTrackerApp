const express=require('express')
const router=express.Router();

const tasksModel=require('../models/tasks')
//Fetch Tasks 
router.get("/list",async(req,res)=>{
  const taskList = await tasksModel.find();
  if (taskList.length === 0) {
    return res.json({ data: "no Tasks in Task Tracker" });
  }
  return res.json({ data: taskList });
})

//GET: /tasks/fetchtask/1
router.get("/fetchtask/:id",async(req,res)=>{
  const id=req.params.id;
  const taskData=await tasksModel.findById(id)
  if(taskData.length === 0){
    return res.json({msg:`Task is not found for id ${id}`})
  }
  return res.json({data:taskData})
})

//Add Task
router.post("/addtask",async(req,res)=>{
    const newTask = req.body;
    tasksModel.create(newTask);
    return res.json({ data: newTask });
})
//Update Task

//PUT: /tasks/updatereminder/:id
// Update Reminder
router.put("/updatereminder/:id",async(req,res)=>{
  const id=req.params.id;
  const updatedData=await productModel.findOneAndUpdate(
      {id:id},
      {reminder:!reminder},
      {new:true}
  );
  return res.json({"Upadated Record Is ":updatedData});
});

//Delete Task
router.delete("/deltask/:id",async(req,res)=>{
  const id=req.params.id;
  const deldata=await tasksModel.findOneAndDelete({id:id});
  return res.json({"Deleted Data Is ":deldata});
})
module.exports=router