const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  description : {
    type: String,
    required:true
  },
  task_status:{
    type:String
  }
})

const TaskModel = new mongoose.model('taskMaster',TaskSchema ,'taskmaster')

module.exports = TaskModel