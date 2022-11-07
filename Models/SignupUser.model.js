const mongoose=require("mongoose");

const signupSchema=new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["user"],default:"user"}
})

const SignupModel=mongoose.model("EvaluationTodoUser",signupSchema)
module.exports={
    SignupModel
}