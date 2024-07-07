const express  = require('express');
const router = express.Router();

const taskCtrl = require('../Controller/taskController')

router.post('/get-all-task',(req,res,next)=>{
     taskCtrl.getAllTask(req,res,next)
})

router.post('/add-task',(req,res,next)=>{
     taskCtrl.addTask(req,res,next)
})

router.post('/edit-task',(req,res,next)=>{
     taskCtrl.editTask(req,res,next)
})

router.post('/delete-task',(req,res,next)=>{
     taskCtrl.deleteTask(req,res,next)
})



module.exports = router
