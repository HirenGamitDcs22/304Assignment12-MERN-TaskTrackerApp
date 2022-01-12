const express=require('express')
const router=express.Router();

const userModel=require('../models/user')


// Get list of all users
//GET: users/list
router.get("/list", async (req, res) => {
  const userList = await userModel.find({});
  if (userList.length === 0) {
    return res.json({ data: "no users in fullstack", });
  }
  return res.json({ data: userList });
});

// Register user
//POST: users/registration
router.post("/registration", async(req, res) => {
  const newUser  = req.body;
  await userModel.create(newUser);
  return res.json({ msg: "registered successfully",data:newUser });
});

//Login
//POST: /users/login
router.post("/login",async(req,res)=>{
  const uname=req.body.uname;
  const pwd=req.body.pwd;
  const user=await userModel.find({ username:uname, password:pwd });
  if(user.length === 0){
      return  res.json({data:"User is not registered",code:'NOT_REGISTERED'});
  }else{
      return res.json({data:"Login successfully",code:'SUCCESS'});
  }
});
module.exports=router