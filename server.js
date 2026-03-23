const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
//in memory DB
let tasks = [];
let taskId = 1;
//CRUD operation
//get all tasks
app.get('/tasks',(req,res)=>{
    res.status(200).json(tasks);
})
//get a particulat task
app.get('/tasks/:id',(req,res)=>{
    const id = Number(req.params.id);
    const task = tasks.find((m)=>m.id===id);
    if(!task) return res.status(404).json({error:"Task not found"});
    res.status(200).json(task);
})
//add a new task 
app.post('/tasks',(req,res)=>{
    const {text,completed} = req.body;
    if(!text) return res.status(400).json({error:"Text not found for task"});
    const task = {
        id:taskId++,
        text,
        completed
    }
    tasks.push(task);
    res.status(201).json(task);
})
//update a task
app.put('/tasks/:id',(req,res)=>{
    const id = Number(req.params.id);
    const{text,completed} = req.body;
    const task = tasks.find((m)=>m.id===id);
    if(!task) return res.status(404).json({error:"Task not found"});
    if (text !== undefined) task.text = text;
    if (completed !== undefined) task.completed = completed;
    res.status(200).json(task);
})
//delete a task 
app.delete('/tasks/:id',(req,res)=>{
    const id = Number(req.params.id);
    const index = tasks.findIndex((m)=>m.id===id);
    if(index === -1) return res.status(404).json({error:"Task not found foe delete"});
    const task = tasks.splice(index,1)[0];
    res.status(200).json(task);

})
app.listen(3003,()=>{
    console.log("Server statred");
})