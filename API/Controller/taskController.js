const { default: mongoose } = require('mongoose')
const taskModel = require('../Models/taskModel')

const taskCtrl = {}

taskCtrl.getAllTask = async (req, res, next) => {
    try {
        // let reBody = JSON.parse(JSON.stringify(req.body))
         let findData = await taskModel.find({})
         res.status(200).send({status:200,message:"Data fetched sucessfully",data:findData})

    } catch (error) {
        console.log("🚀 ~ taskCtrl.getAllTask= ~ error:", error)
      res.send({status:500,message:"Error in getting data",error})
    }
}


taskCtrl.addTask = async (req, res, next) => {

    try {
        let reqBody = JSON.parse(JSON.stringify(req.body))
        console.log("🚀 ~ taskCtrl.addTask= ~ reqBody:", reqBody)

        let data = await taskModel.create(reqBody)

        res.status(200).send({ status: 200, message: "Task added Successfully", data: data })

    } catch (error) {
        console.log("🚀 ~ taskCtrl.addTask= ~ error:", error)
        res.status(500).send({ status: 500, message: "Error in adding task",  error })

    }
}

taskCtrl.editTask = async (req,res,next) =>{
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body))
        console.log("🚀 ~ taskCtrl.editTask= ~ reBody:", reqBody)
        let query = {
            _id : new mongoose.Types.ObjectId(reqBody._id)
        }
        let updatedObj = {
            title: reqBody.title,
            description: reqBody.description
        }
        let fetchTask = await taskModel.findByIdAndUpdate(query,updatedObj)

        res.send({status:200,message:'Task Updated succesfully',data:fetchTask})
        
    } catch (error) {
        console.log("🚀 ~ taskCtrl.editTask= ~ error:", error)
        res.send({status:400,message:"Error in edting Task",error})
        
    }
}

taskCtrl.deleteTask = async (req,res,next) =>{
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body))
        console.log("🚀 ~ taskCtrl.deleteTask ~ reqBody:", reqBody)
        let query = {
            _id : new mongoose.Types.ObjectId(reqBody._id)
        }
        let deleteTask = await taskModel.findByIdAndDelete(query)

        res.send({status:200,message:"Task deleted succesfully",data:deleteTask})
        
    } catch (error) {
        console.log("🚀 ~ taskCtrl.deleteTask ~ error:", error)
        
    }
}

module.exports = taskCtrl