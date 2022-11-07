const {Router}=require("express")
const bcrypt=require("bcrypt");
require("dotenv").config()
const jwt=require("jsonwebtoken")
const { SignupModel } = require("../Models/SignupUser.model");
signupRoute=Router()

signupRoute.post("/signup",(req,res)=>{
    const {userName,email,password}=req.body;

    const isUser=SignupModel.find({email})


        bcrypt.hash(password, 4, async function(err, hashed_password) {
            // Store hash in your password DB.
            if(err){
                res.send({"msg":"Somthing wrong"})
            }
            else{
                const user=new SignupModel({
                    userName:userName,
                    email:email,
                    password:hashed_password
                })
                await user.save()
                res.send({"msg":"Signup successfuly"})
            }
        });
    
})


signupRoute.post("/login",async(req,res)=>{
    
    const {useName,email,password}=req.body;
    const user=await SignupModel.findOne({email})
    console.log(user.password)
    const hashed_password=user.password
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(result){
            jwt.sign({ email: email }, process.env.SECRET_KEY, function(err, token) {
                if(err){
                    res.send({"msg":"Sorry try again"})
                }
                else{
                    res.send({"token":token})
                }
            });
        }
        else{
            console.log(err)
             res.send({"msg":"Something wrong try again"})
        }
    });
    
})
module.exports={
    signupRoute
}