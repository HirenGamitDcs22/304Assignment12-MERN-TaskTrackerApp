const express=require('express')
const router=express.Router();

const userModel=require('../models/user')


// Get list of all users
router.get("/list", async (req, res) => {
  const userList = await userModel.find({}, { username: true });

  if (userList.length === 0) {
    return res.json({ data: "no users in fullstack" });
  }

  return res.json({ data: userList });
});

// Register user
router.post("/registration", (req, res) => {
  const newUser  = req.body;
  userModel.create(newUser);
  return res.json({ data: "registered successfully" });
});

module.exports=router