const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 4001

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tasktracker")
        .then(()=>console.log("MongoDB Connectes Successfully"))

//const userRouter=require("./routes/user");
const tasksRouter=require("./routes/tasks");

app.use("/api/tasks",tasksRouter);
//app.use("/api/user",userRouter);
const userRouter=require('./routes/user')

app.use("/api/users",userRouter);


app.get("/api", (req, res) => res.send("Hello Fullstack!"));
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))