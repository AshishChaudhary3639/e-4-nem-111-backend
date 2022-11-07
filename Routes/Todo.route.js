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



todoRoute.put("/update/:_id",authentication,async(req,res)=>{
    await TodoModel.updateOne(req.params,{
        $set:req.body
    })
    res.send({"msg":"Data updated successfuly"})

})


todoRoute.delete("/delete/:_id",authentication,async(req,res)=>{
    await TodoModel.deleteOne(req.params)
    res.send({"msg":"Data delete successfuly"})

})
module.exports={
    todoRoute
}