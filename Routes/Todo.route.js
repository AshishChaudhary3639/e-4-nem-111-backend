const {Router}=require("express")
const { authentication } = require("../middleware/authentication");
const { TodoModel } = require("../Models/Todo.model");

const todoRoute=Router()

todoRoute.post("/create", authentication,async(req,res)=>{
    const {taskname,status,tag,userId}=req.body;

    const userData=new TodoModel({
        taskname,
        status,
        tag,
        userId
    })
    await userData.save()
    res.send({"msg":"Todo submited"})

})


todoRoute.get("/gettodo", authentication,async(req,res)=>{
    const {taskname,status,tag,userId}=req.body;
    try{
        let todoData= await TodoModel.find({userId})
        res.send(todoData)
    }
    catch(err){
        res.send({"msg":"Invalid try again"})
    }

})
module.exports={
    todoRoute
}